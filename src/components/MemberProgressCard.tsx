
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface MemberProgressCardProps {
  member: {
    id: string;
    name: string;
    avatar_url: string;
    color: string;
  };
  completedTasks: number;
  totalTasks: number;
  points: number;
}

export const MemberProgressCard = ({
  member,
  completedTasks,
  totalTasks,
  points,
}: MemberProgressCardProps) => {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          <AvatarImage src={member.avatar_url} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{member.name}</h3>
          <div className="text-sm text-gray-500">
            {completedTasks} / {totalTasks} tâches
          </div>
        </div>
      </div>
      
      <Progress
        value={progress}
        className="h-2"
        style={{ backgroundColor: `${member.color}20` }}
        indicatorStyle={{ backgroundColor: member.color }}
      />
      
      <div className="mt-2 text-sm font-medium" style={{ color: member.color }}>
        ⭐ {points} points
      </div>
    </div>
  );
};
