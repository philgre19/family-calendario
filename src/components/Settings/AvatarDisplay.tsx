
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Member } from "@/types/database.types";

interface AvatarDisplayProps {
  member: Member;
  avatarUrl: string | null;
  avatarType: 'illustrated' | 'photo';
  selectedItems?: Partial<Member>;
  className?: string;
}

export function AvatarDisplay({ 
  member,
  avatarUrl, 
  avatarType,
  selectedItems,
  className 
}: AvatarDisplayProps) {
  const showIllustrated = avatarType === "illustrated" && 
    (selectedItems?.current_hair || selectedItems?.current_clothes || selectedItems?.current_accessory);

  const showPhoto = avatarType === "photo" && avatarUrl;

  const renderIllustratedAvatar = () => (
    <div className="relative w-full h-full">
      {selectedItems?.current_clothes && (
        <img 
          src={`/avatars/clothes/${selectedItems.current_clothes}.png`}
          alt="Vêtements"
          className="absolute inset-0 w-full h-full object-contain transition-all animate-fade-in"
        />
      )}
      {selectedItems?.current_hair && (
        <img 
          src={`/avatars/hair/${selectedItems.current_hair}.png`}
          alt="Coiffure"
          className="absolute inset-0 w-full h-full object-contain transition-all animate-fade-in"
          style={{ 
            filter: selectedItems.current_hair_color 
              ? `hue-rotate(${selectedItems.current_hair_color}deg)` 
              : undefined 
          }}
        />
      )}
      {selectedItems?.current_accessory && (
        <img 
          src={`/avatars/accessories/${selectedItems.current_accessory}.png`}
          alt="Accessoire"
          className="absolute inset-0 w-full h-full object-contain transition-all animate-fade-in"
        />
      )}
    </div>
  );

  return (
    <div className="relative group">
      <Avatar className={cn(
        "ring-4 ring-purple-200 group-hover:ring-purple-300 transition-all duration-300",
        className
      )}>
        {showIllustrated ? (
          renderIllustratedAvatar()
        ) : showPhoto ? (
          <AvatarImage 
            src={avatarUrl} 
            alt={member.name} 
            className="object-cover animate-fade-in"
          />
        ) : (
          <AvatarFallback>
            <Camera className="w-12 h-12 text-purple-300" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="absolute -top-2 -right-2 transform rotate-12 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
    </div>
  );
}
