
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const members = [
  { id: 1, name: "Emma", initials: "E", color: "bg-[hsl(var(--emma-color))]", isOnline: true },
  { id: 2, name: "Lucas", initials: "L", color: "bg-[hsl(var(--lucas-color))]", isOnline: false },
  { id: 3, name: "Sophie", initials: "S", color: "bg-[hsl(var(--sophie-color))]", isOnline: true },
];

export const MemberBar = () => {
  return (
    <div className="flex items-center gap-2 slide-in-left">
      {members.map((member) => (
        <button
          key={member.id}
          className="group relative transition-transform hover:scale-105"
        >
          <Avatar className={`w-10 h-10 ${member.color} hover:shadow-md transition-shadow`}>
            <AvatarFallback className="text-gray-700 font-medium">
              {member.initials}
            </AvatarFallback>
          </Avatar>
          {member.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                           border-2 border-white rounded-full scale-in" />
          )}
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                         bg-white px-2 py-1 rounded text-sm shadow-sm opacity-0 
                         group-hover:opacity-100 transition-opacity">
            {member.name}
          </span>
        </button>
      ))}
    </div>
  );
};
