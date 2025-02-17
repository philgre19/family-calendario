
import { Member } from "@/types/database.types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface AvatarPreviewProps {
  member: Member;
  selectedHair?: string;
  selectedClothes?: string;
  selectedAccessory?: string;
  hairColor?: string;
  className?: string;
}

export function AvatarPreview({ 
  member, 
  selectedHair, 
  selectedClothes, 
  selectedAccessory,
  hairColor,
  className 
}: AvatarPreviewProps) {
  const isIllustrated = member.avatar_type === 'illustrated';

  if (!isIllustrated && member.avatar_url) {
    return (
      <Avatar className={className}>
        <AvatarImage src={member.avatar_url} alt={member.name} className="object-cover" />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className={className}>
      <div className="relative w-full h-full">
        {selectedClothes && (
          <img 
            src={`/avatars/clothes/${selectedClothes}.png`} 
            alt="Vêtements" 
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {selectedHair && (
          <img 
            src={`/avatars/hair/${selectedHair}.png`}
            alt="Coiffure"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ filter: hairColor ? `hue-rotate(${hairColor}deg)` : undefined }}
          />
        )}
        {selectedAccessory && (
          <img 
            src={`/avatars/accessories/${selectedAccessory}.png`}
            alt="Accessoire"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {!selectedHair && !selectedClothes && !selectedAccessory && (
          <AvatarFallback>
            <Camera className="w-8 h-8 text-muted-foreground" />
          </AvatarFallback>
        )}
      </div>
    </Avatar>
  );
}
