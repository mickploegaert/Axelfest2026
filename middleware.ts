import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Blokkeer verdachte user agents (bots, scrapers, vulnerability scanners)
const BLOCKED_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'nmap',
  'masscan',
  'zgrab',
  'dirbuster',
  'wpscan',
  'nuclei',
  'gobuster',
  'acunetix',
  'nessus',
  'qualys',
  'openvas',
];

// Blokkeer verdachte paden (common attack vectors)
const BLOCKED_PATHS = [
  '/wp-admin',
  '/wp-login',
  '/wp-content',
  '/wp-includes',
  '/xmlrpc.php',
  '/phpmyadmin',
  '/administrator',
  '/admin.php',
  '/.env',
  '/.git',
  '/config.php',
  '/backup',
  '/shell',
  '/cmd',
  '/eval',
  '/exec',
];

// Verdachte query parameters die vaak in aanvallen worden gebruikt
const SUSPICIOUS_PARAMS = [
  'eval(',
  'base64_decode',
  'exec(',
  'system(',
  'passthru(',
  '<script>',
  'javascript:',
  'SELECT ',
  'UNION ',
  'DROP ',
  'INSERT ',
  'UPDATE ',
  'DELETE ',
  '../',
  '..\\',
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
  // 1. Check voor geblokkeerde user agents
  for (const blocked of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(blocked)) {
      console.log(`[Security] Blocked user agent: ${userAgent}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  
  // 2. Check voor geblokkeerde paden
  const lowerPath = pathname.toLowerCase();
  for (const blockedPath of BLOCKED_PATHS) {
    if (lowerPath.includes(blockedPath)) {
      console.log(`[Security] Blocked path: ${pathname}`);
      return new NextResponse('Not Found', { status: 404 });
    }
  }
  
  // 3. Check voor verdachte query parameters (SQL injection, XSS, etc.)
  const fullUrl = pathname + search;
  const decodedUrl = decodeURIComponent(fullUrl).toLowerCase();
  
  for (const suspicious of SUSPICIOUS_PARAMS) {
    if (decodedUrl.includes(suspicious.toLowerCase())) {
      console.log(`[Security] Blocked suspicious request: ${fullUrl}`);
      return new NextResponse('Bad Request', { status: 400 });
    }
  }
  
  // 4. Voeg extra security headers toe aan de response
  const response = NextResponse.next();
  
  // Voorkom dat de site in een iframe wordt geladen door andere sites
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Voorkom MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // XSS bescherming (legacy)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Configureer welke paden de middleware moet checken
export const config = {
  matcher: [
    /*
     * Match alle paths behalve:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)',
  ],
};
