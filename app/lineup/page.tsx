import { Footer } from "../components";
import LineupContent from "./LineupContent";

export const metadata = {
  title: "Line-up - Axelfest 2026",
  description: "De line-up van Axelfest 2026 wordt binnenkort bekendgemaakt!",
};

export default function LineupPage() {
  return (
    <main>
      <LineupContent />
      <Footer />
    </main>
  );
}
