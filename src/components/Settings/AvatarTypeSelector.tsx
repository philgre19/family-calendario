
import { Button } from "@/components/ui/button";
import { Camera, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarTypeSelectorProps {
  avatarType: 'illustrated' | 'photo';
  onTypeChange: (type: 'illustrated' | 'photo') => void;
}

export function AvatarTypeSelector({ avatarType, onTypeChange }: AvatarTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant={avatarType === "illustrated" ? "default" : "outline"}
        className={cn(
          "h-auto p-6 space-y-3 rounded-xl transition-all",
          avatarType === "illustrated" 
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg" 
            : "hover:bg-primary/5 hover:scale-105"
        )}
        onClick={() => onTypeChange("illustrated")}
      >
        <div className="w-full aspect-square rounded-full bg-white/90 flex items-center justify-center">
          <Palette className="w-10 h-10 text-primary" />
        </div>
        <p className="text-lg">Avatar illustré</p>
        <p className="text-sm font-normal opacity-90">Crée ton personnage unique !</p>
      </Button>

      <Button
        variant={avatarType === "photo" ? "default" : "outline"}
        className={cn(
          "h-auto p-6 space-y-3 rounded-xl transition-all",
          avatarType === "photo" 
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg" 
            : "hover:bg-primary/5 hover:scale-105"
        )}
        onClick={() => onTypeChange("photo")}
      >
        <div className="w-full aspect-square rounded-full bg-white/90 flex items-center justify-center">
          <Camera className="w-10 h-10 text-primary" />
        </div>
        <p className="text-lg">Photo perso</p>
        <p className="text-sm font-normal opacity-90">Utilise ta propre photo !</p>
      </Button>
    </div>
  );
}
