
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

interface AddEventForm {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  participants: string[];
}

const AddEvent = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AddEventForm>();

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase.from("members").select("*");
      return data || [];
    },
  });

  const onSubmit = async (data: AddEventForm) => {
    try {
      const { error } = await supabase.from("events").insert({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        participants: data.participants,
      });

      if (error) throw error;

      toast.success("Événement créé avec succès");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de la création de l'événement");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-8">Ajouter un événement</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Titre
            </label>
            <Input
              {...register("title", { required: true })}
              placeholder="Titre de l'événement..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              {...register("description")}
              placeholder="Description de l'événement..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Date et heure de début
              </label>
              <Input
                type="datetime-local"
                {...register("start_date", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Date et heure de fin
              </label>
              <Input
                type="datetime-local"
                {...register("end_date", { required: true })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Participants
            </label>
            <Select
              {...register("participants")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner les participants" />
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

          <Button type="submit" className="w-full bg-[#34A853]">
            Créer l'événement
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddEvent;
