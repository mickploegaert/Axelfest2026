import { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';
import { Footer } from '../components';

export const metadata: Metadata = {
  title: 'Privacyverklaring - Axelfest',
  description: 'Privacyverklaring van Axelfest 2026. Lees hoe wij omgaan met je persoonlijke gegevens.',
};

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyContent />
      <Footer />
    </main>
  );
}
