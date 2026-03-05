import { Footer } from "../components";
import SponsorsPage from "./SponsorsPage";

export const metadata = {
  title: "Sponsors - Axelfest 2026",
  description: "Bekijk de sponsors die Axelfest 2026 mogelijk maken. Word ook sponsor van het festival op het Hofplein in Axel.",
};

export default function Sponsors() {
  return (
    <main>
      <SponsorsPage />
      <Footer />
    </main>
  );
}
