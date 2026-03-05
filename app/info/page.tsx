import { Info, Footer } from "../components";

export const metadata = {
  title: "Info - Axelfest 2026",
  description: "Alle praktische informatie over Axelfest 2026: locatie, openingstijden, parkeren, huisregels en veelgestelde vragen.",
};

export default function InfoPage() {
  return (
    <main>
      <Info />
      <Footer />
    </main>
  );
}
