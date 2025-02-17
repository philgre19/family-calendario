
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarPreview } from "./AvatarPreview";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      return data;
    },
    enabled: !!memberId
  });

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        {avatarType === "illustrated" && member ? (
          <AvatarPreview
            member={member}
            selectedHair={member.current_hair || undefined}
            selectedClothes={member.current_clothes || undefined}
            selectedAccessory={member.current_accessory || undefined}
            hairColor={member.current_hair_color || undefined}
            className="w-32 h-32 ring-2 ring-primary/20 transition-all hover:ring-primary/40"
          />
        ) : (
          <Avatar className="w-32 h-32 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
            {avatarUrl ? (
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
