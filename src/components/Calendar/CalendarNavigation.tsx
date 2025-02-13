
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MemberFilters } from "./MemberFilters";

interface CalendarNavigationProps {
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export const CalendarNavigation = ({
  onPreviousWeek,
  onNextWeek,
}: CalendarNavigationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <MemberFilters members={[{ name: "Emma" }, { name: "Lucas" }, { name: "Sophie" }]} />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPreviousWeek}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onNextWeek}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
