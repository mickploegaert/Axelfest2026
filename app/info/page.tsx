import { Info, Footer } from "../components";

export const metadata = {
  title: "Info - Axelfest",
  description: "Alle praktische informatie over Axelfest 2026",
};

export default function InfoPage() {
  return (
    <main>
      <div className="pt-20 sm:pt-24 md:pt-28" />
      <Info />
      <Footer />
    </main>
  );
}
