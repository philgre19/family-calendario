
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddTaskForm {
  description: string;
  date?: string;
  points?: number;
  member_ids: string[];
}

const AddTask = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AddTaskForm>();

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase.from("members").select("*");
      return data || [];
    },
  });

  const onSubmit = async (data: AddTaskForm) => {
    try {
      const { error } = await supabase.from("tasks").insert({
        description: data.description,
        date: data.date || null,
        points: data.points || 0,
        members_ids: data.member_ids,
      });

      if (error) throw error;

      toast.success("Tâche créée avec succès");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de la création de la tâche");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-8">Ajouter une tâche</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Description de la tâche..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Date (optionnelle)
            </label>
            <Input
              type="datetime-local"
              {...register("date")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Points
            </label>
            <Input
              type="number"
              {...register("points", { min: 0 })}
              defaultValue={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Membres assignés
            </label>
            <Select
              {...register("member_ids")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner les membres" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-[#4285F4]">
            Enregistrer la tâche
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddTask;
