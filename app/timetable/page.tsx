import { Footer } from "../components";
import TimetableContent from "./TimetableContent";

export const metadata = {
  title: "Timetable - Axelfest 2026",
  description: "De timetable van Axelfest 2026 wordt binnenkort bekendgemaakt!",
};

export default function TimetablePage() {
  return (
    <main>
      <TimetableContent />
      <Footer />
    </main>
  );
}
