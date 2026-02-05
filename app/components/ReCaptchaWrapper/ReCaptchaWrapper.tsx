'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

interface ReCaptchaWrapperProps {
  children: ReactNode;
}

export default function ReCaptchaWrapper({ children }: ReCaptchaWrapperProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LdbnmAsAAAAAOtdNKTyJnx0t64CAGDMUsds7nJw"
      useEnterprise={false}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
      container={{
        parameters: {
          badge: 'bottomright',
          theme: 'dark',
        }
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
