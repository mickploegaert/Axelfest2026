'use client';

import Script from 'next/script';
import { ReactNode } from 'react';

interface TurnstileWrapperProps {
  children: ReactNode;
}

export default function TurnstileWrapper({ children }: TurnstileWrapperProps) {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      {children}
    </>
  );
}
