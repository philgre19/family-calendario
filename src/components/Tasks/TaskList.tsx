
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trophy, Swords, ScrollText } from "lucide-react";
import { NewTaskDialog } from "./NewTaskDialog";
import { useTasks } from "@/hooks/useTasks";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemberProgress } from "@/hooks/useMemberProgress";

export const TaskList = () => {
  const { tasks, isLoading, addTask, updateTask, deleteTask } = useTasks();

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase.from("members").select("*");
      return data || [];
    },
  });

  const getQuestIcon = (type: string) => {
    switch (type) {
      case "daily_quest":
        return <ScrollText className="h-4 w-4 text-blue-500" />;
      case "challenge":
        return <Swords className="h-4 w-4 text-purple-500" />;
      default:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTaskColor = (task: any) => {
    if (task.completed) return "bg-gray-100";
    const daysSinceCreation = Math.floor(
      (new Date().getTime() - new Date(task.created_at).getTime()) /
        (1000 * 3600 * 24)
    );
    if (daysSinceCreation <= 1) return "bg-green-50";
    if (daysSinceCreation <= 3) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Quêtes & Missions</h2>
        <NewTaskDialog onAdd={addTask.mutate} />
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-4 p-4 rounded-lg shadow-sm transition-all ${getTaskColor(
              task
            )}`}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) =>
                updateTask.mutate({ id: task.id, completed: !!checked })
              }
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {getQuestIcon(task.quest_type)}
                <p
                  className={`text-sm ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.description}
                </p>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                +{task.xp_reward} XP • +{task.gold_reward} 🪙
              </div>
            </div>
            <Select
              value={task.assigned_to || ""}
              onValueChange={(value) =>
                updateTask.mutate({ id: task.id, assigned_to: value || null })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Assigner">
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar_url} />
                        <AvatarFallback>
                          {task.assignee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{task.assignee.name}</span>
                    </div>
                  ) : (
                    "Assigner"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar_url || ""} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};
