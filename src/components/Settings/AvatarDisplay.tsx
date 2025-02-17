
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarDisplayProps {
  avatarUrl: string | null;
  avatarType: 'illustrated' | 'photo';
  memberName: string;
  uploadProgress?: number;
}

export function AvatarDisplay({ avatarUrl, avatarType, memberName, uploadProgress = 0 }: AvatarDisplayProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <Avatar className="w-32 h-32 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
          {avatarUrl ? (
            <AvatarImage 
              src={avatarUrl} 
              alt={memberName} 
              className={cn(
                "object-cover transition-all duration-200",
                avatarType === "photo" && "rounded-full"
              )}
            />
          ) : (
            <AvatarFallback>
              <Camera className="w-12 h-12 text-primary/40" />
            </AvatarFallback>
          )}
        </Avatar>
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
