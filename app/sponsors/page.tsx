import { Footer } from "../components";
import SponsorsPage from "./SponsorsPage";

export const metadata = {
  title: "Sponsors - Axelfest",
  description: "Onze geweldige sponsors die Axelfest 2026 mogelijk maken",
};

export default function Sponsors() {
  return (
    <main>
      <SponsorsPage />
      <Footer />
    </main>
  );
}
