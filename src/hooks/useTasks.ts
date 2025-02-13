
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Task, Member } from "@/types/database.types";

interface TaskWithAssignee extends Task {
  assignee?: {
    name: string;
    avatar_url: string;
    color: string;
  };
}

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      // Récupérer les tâches
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      // Récupérer tous les membres
      const { data: members } = await supabase
        .from("members")
        .select("*");

      // Mapper les tâches avec les informations des membres assignés
      return tasks?.map((task): TaskWithAssignee => {
        const assignee = members?.find((m) => m.id === task.assigned_to);
        return {
          ...task,
          assignee: assignee
            ? {
                name: assignee.name,
                avatar_url: assignee.avatar_url || "",
                color: assignee.color,
              }
            : undefined,
        };
      }) || [];
    },
  });

  const addTask = useMutation({
    mutationFn: async (task: { description: string; points: number }) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          description: task.description,
          points: task.points,
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({
      id,
      completed,
      assigned_to,
    }: {
      id: string;
      completed?: boolean;
      assigned_to?: string;
    }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ completed, assigned_to })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
  };
};
