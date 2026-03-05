import { Contact, Footer, TurnstileWrapper } from "../components";

export const metadata = {
  title: "Contact - Axelfest 2026",
  description: "Neem contact op met de organisatie van Axelfest 2026. Stel je vraag over tickets, line-up of praktische info.",
};

export default function ContactPage() {
  return (
    <main>
      <TurnstileWrapper>
        <Contact />
      </TurnstileWrapper>
      <Footer />
    </main>
  );
}
