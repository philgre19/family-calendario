
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
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
          "h-auto p-4 space-y-2 transition-all",
          avatarType === "illustrated" ? "bg-primary text-primary-foreground" : "hover:bg-primary/5"
        )}
        onClick={() => onTypeChange("illustrated")}
      >
        <div className="w-full aspect-square rounded-full bg-primary/10 flex items-center justify-center">
          <Camera className="w-8 h-8 text-primary" />
        </div>
        <p>Avatar illustré</p>
      </Button>

      <Button
        variant={avatarType === "photo" ? "default" : "outline"}
        className={cn(
          "h-auto p-4 space-y-2 transition-all",
          avatarType === "photo" ? "bg-primary text-primary-foreground" : "hover:bg-primary/5"
        )}
        onClick={() => onTypeChange("photo")}
      >
        <div className="w-full aspect-square rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <p>Photo personnelle</p>
      </Button>
    </div>
  );
}
