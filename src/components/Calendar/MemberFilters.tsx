
import { Button } from "@/components/ui/button";

interface MemberFiltersProps {
  members: Array<{ name: string }>;
}

export const MemberFilters = ({ members }: MemberFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      {members.map((member) => (
        <div 
          key={member.name}
          className={`px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 ${
            member.name === "Emma" ? "bg-[hsl(var(--emma-color))]" :
            member.name === "Lucas" ? "bg-[hsl(var(--lucas-color))]" :
            "bg-[hsl(var(--sophie-color))]"
          }`}
        >
          {member.name}
        </div>
      ))}
    </div>
  );
};
