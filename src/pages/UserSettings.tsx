
import { MainLayout } from "@/components/MainLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Member } from "@/types/database.types";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Plus, Crown, UserCheck, UserMinus, Pencil, Users, AlertCircle, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function UserSettings() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "member",
    avatar_type: "illustrated" as const,
    color: "#" + Math.floor(Math.random()*16777215).toString(16)
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*');
      
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      toast.error("Erreur lors du chargement des membres");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .insert([newMember])
        .select()
        .single();

      if (error) throw error;

      setMembers(prev => [...prev, data]);
      setIsAddingMember(false);
      setNewMember({
        name: "",
        role: "member",
        avatar_type: "illustrated",
        color: "#" + Math.floor(Math.random()*16777215).toString(16)
      });
      toast.success("Membre ajouté avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout du membre");
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="w-8 h-8 text-primary" />
              Gestion des membres
            </h1>
            <p className="text-muted-foreground">
              Gérez les membres de votre famille et leurs rôles
            </p>
          </div>
          <Button onClick={() => setIsAddingMember(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un membre
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {members.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => setSelectedMember(member)}
                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12 ring-2 ring-primary/10">
                              {member.avatar_url ? (
                                <AvatarImage src={member.avatar_url} alt={member.name} />
                              ) : (
                                <AvatarFallback 
                                  style={{backgroundColor: member.color}}
                                  className="text-white"
                                >
                                  {member.name.charAt(0)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold truncate">
                                {member.name}
                              </h3>
                              {member.participate_in_quests && (
                                <Crown className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Niveau {member.level || 1}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs">XP: {member.xp || 0}</p>
                        <p className="text-xs">Style de quête: {member.quest_language_style || "RPG"}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sheet pour ajouter un membre */}
        <Sheet open={isAddingMember} onOpenChange={setIsAddingMember}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Ajouter un membre</SheetTitle>
              <SheetDescription>
                Créez un nouveau membre de la famille. Vous pourrez personnaliser son profil plus tard.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  placeholder="Ex: Jean"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({...prev, name: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label>Type d'avatar</Label>
                <RadioGroup
                  value={newMember.avatar_type}
                  onValueChange={(value: "illustrated" | "photo") => 
                    setNewMember(prev => ({...prev, avatar_type: value}))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="illustrated" id="illustrated" />
                    <Label htmlFor="illustrated">Avatar illustré</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="photo" id="photo" />
                    <Label htmlFor="photo">Photo</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Couleur</Label>
                <Input
                  type="color"
                  value={newMember.color}
                  onChange={(e) => setNewMember(prev => ({...prev, color: e.target.value}))}
                />
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Annuler</Button>
              </SheetClose>
              <Button onClick={handleAddMember}>
                Ajouter le membre
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Sheet pour éditer un membre */}
        <Sheet open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <SheetContent>
            {selectedMember && (
              <>
                <SheetHeader>
                  <SheetTitle>Profil de {selectedMember.name}</SheetTitle>
                  <SheetDescription>
                    Consultez et modifiez les informations du membre
                  </SheetDescription>
                </SheetHeader>

                <div className="py-4 space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      {selectedMember.avatar_url ? (
                        <AvatarImage src={selectedMember.avatar_url} alt={selectedMember.name} />
                      ) : (
                        <AvatarFallback 
                          style={{backgroundColor: selectedMember.color}}
                          className="text-2xl text-white"
                        >
                          {selectedMember.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Niveau {selectedMember.level || 1} • {selectedMember.xp || 0} XP
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Style de quêtes</Label>
                      <Select 
                        value={selectedMember.quest_language_style || "rpg"}
                        onValueChange={(value) => {
                          // Implement update logic
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Style</SelectLabel>
                            <SelectItem value="rpg">RPG</SelectItem>
                            <SelectItem value="neutral">Neutre</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Participation aux quêtes</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={selectedMember.participate_in_quests ? "default" : "outline"}
                          onClick={() => {
                            // Implement update logic
                          }}
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Participe
                        </Button>
                        <Button
                          variant={!selectedMember.participate_in_quests ? "default" : "outline"}
                          onClick={() => {
                            // Implement update logic
                          }}
                        >
                          <UserMinus className="w-4 h-4 mr-2" />
                          Ne participe pas
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Fermer</Button>
                  </SheetClose>
                  <Button variant="destructive">
                    Supprimer le membre
                  </Button>
                </SheetFooter>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </MainLayout>
  );
}
