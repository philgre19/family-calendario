
import { Member } from "@/types/database.types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Pencil, Users } from "lucide-react";
import { MemberAvatarEditor } from "./MemberAvatarEditor";

interface MembersListProps {
  members: Member[];
  onMemberSelect: (member: Member) => void;
  onClose: () => void;
}

export function MembersList({ members, onMemberSelect, onClose }: MembersListProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-muted-foreground" />
        <h2 className="text-2xl font-medium">Membres de la famille</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Sheet key={member.id}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full p-4 h-auto"
                onClick={() => onMemberSelect(member)}
              >
                <div className="flex items-center gap-4 w-full">
                  <Avatar className="w-16 h-16">
                    {member.avatar_url ? (
                      <AvatarImage src={member.avatar_url} alt={member.name} />
                    ) : (
                      <AvatarFallback>
                        {member.avatar_type === "illustrated" ? (
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-lg font-medium">{member.name}</p>
                  </div>
                  <Pencil className="w-5 h-5 text-muted-foreground" />
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Personnalisation de {member.name}</SheetTitle>
              </SheetHeader>
              <MemberAvatarEditor member={member} onClose={onClose} />
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </section>
  );
}
