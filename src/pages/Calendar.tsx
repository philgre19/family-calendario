
import { MainLayout } from "@/components/MainLayout";
import { WeekCalendar } from "@/components/Calendar/WeekCalendar";

export default function Calendar() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Calendrier Familial</h1>
        <WeekCalendar />
      </div>
    </MainLayout>
  );
}
