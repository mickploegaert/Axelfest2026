import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting store (voor productie gebruik Redis of vergelijkbaar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuratie
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuut
const MAX_REQUESTS = 5; // Max 5 requests per minuut per IP

// Schoon verlopen entries op
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  cleanupRateLimitStore();
  
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }
  
  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

// Valideer email formaat
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input (basis XSS preventie)
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Verifieer Turnstile token met Cloudflare
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is niet geconfigureerd');
    return false;
  }
  
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verificatie fout:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  // Haal IP adres op (werkt met Vercel en Cloudflare)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             request.headers.get('cf-connecting-ip') ||
             'unknown';
  
  // Check rate limit
  const { allowed, remaining } = checkRateLimit(ip);
  
  if (!allowed) {
    return NextResponse.json(
      { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60',
        }
      }
    );
  }
  
  try {
    const body = await request.json();
    const { name, email, message, turnstileToken } = body;
    
    // Valideer verplichte velden
    if (!name || !email || !message || !turnstileToken) {
      return NextResponse.json(
        { error: 'Alle velden zijn verplicht' },
        { status: 400 }
      );
    }
    
    // Valideer veld lengtes
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Naam mag maximaal 100 karakters zijn' },
        { status: 400 }
      );
    }
    
    if (email.length > 254) {
      return NextResponse.json(
        { error: 'Email mag maximaal 254 karakters zijn' },
        { status: 400 }
      );
    }
    
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Bericht mag maximaal 5000 karakters zijn' },
        { status: 400 }
      );
    }
    
    // Valideer email formaat
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Ongeldig email adres' },
        { status: 400 }
      );
    }
    
    // Verifieer Turnstile token
    const isValidToken = await verifyTurnstileToken(turnstileToken, ip);
    
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Beveiligingsverificatie mislukt. Vernieuw de pagina en probeer opnieuw.' },
        { status: 403 }
      );
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    };
    
    // TODO: Stuur email of sla op in database
    // Voorbeeld met een email service:
    // await sendEmail({
    //   to: 'info@axelfest.nl',
    //   subject: `Contactformulier: ${sanitizedData.name}`,
    //   body: `Van: ${sanitizedData.name} (${sanitizedData.email})\n\nBericht:\n${sanitizedData.message}`
    // });
    
    console.log('Contactformulier ontvangen:', {
      ...sanitizedData,
      ip,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json(
      { success: true, message: 'Bericht succesvol verzonden!' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    );
    
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    );
  }
}

// Blokkeer andere HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
