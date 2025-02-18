
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarPreview } from "./AvatarPreview";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Member } from "@/types/database.types";

interface AvatarDisplayProps {
  avatarUrl: string | null;
  avatarType: 'illustrated' | 'photo';
  memberName: string;
  uploadProgress?: number;
  memberId?: string;
}

export function AvatarDisplay({ 
  avatarUrl, 
  avatarType, 
  memberName, 
  uploadProgress = 0,
  memberId 
}: AvatarDisplayProps) {
  const { data: member } = useQuery({
    queryKey: ["members", memberId],
    queryFn: async () => {
      if (!memberId) return null;
      const { data } = await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();
      return data as Member | null;
    },
    enabled: !!memberId
  });

  // Déterminer quel type d'avatar afficher
  const shouldShowIllustrated = avatarType === "illustrated" && 
    member && 
    (member.current_hair || member.current_clothes || member.current_accessory);

  const shouldShowPhoto = avatarType === "photo" && avatarUrl;

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        {shouldShowIllustrated ? (
          <AvatarPreview
            member={member}
            selectedHair={member.current_hair}
            selectedClothes={member.current_clothes}
            selectedAccessory={member.current_accessory}
            hairColor={member.current_hair_color}
            className="w-32 h-32 ring-2 ring-primary/20 transition-all hover:ring-primary/40"
          />
        ) : (
          <Avatar className="w-32 h-32 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
            {shouldShowPhoto ? (
              <AvatarImage 
                src={avatarUrl} 
                alt={memberName} 
                className="object-cover"
              />
            ) : (
              <AvatarFallback>
                <Camera className="w-12 h-12 text-primary/40" />
              </AvatarFallback>
            )}
          </Avatar>
        )}
        {uploadProgress > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <div className="text-white text-sm font-medium">
              {uploadProgress}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
