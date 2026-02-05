import { Contact, Footer, TurnstileWrapper } from "../components";

export const metadata = {
  title: "Contact - Axelfest",
  description: "Neem contact op met Axelfest 2026",
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
