
import { useCallback, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Member } from "@/types/database.types";
import { Settings as SettingsIcon } from "lucide-react";
import { MembersList } from "@/components/Settings/MembersList";
import { useMembers } from "@/hooks/useMembers";

export default function Settings() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { data: members, isLoading } = useMembers();

  const onClose = useCallback(() => {
    setSelectedMember(null);
  }, []);

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-muted-foreground" />
          <h1 className="text-3xl font-semibold">Paramètres</h1>
        </div>

        <div className="grid gap-8">
          {isLoading ? (
            <p>Chargement des membres...</p>
          ) : members ? (
            <MembersList 
              members={members} 
              onMemberSelect={setSelectedMember}
              onClose={onClose}
            />
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
}
