
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Member } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AvatarItemSelector } from "./AvatarItemSelector";
import { AvatarPreview } from "./AvatarPreview";

interface IllustratedAvatarEditorProps {
  member: Member;
  onUpdate: (updates: Partial<Member>) => void;
}

const hairColors = [
  { name: "Noir", value: "0" },
  { name: "Brun", value: "30" },
  { name: "Blond", value: "60" },
  { name: "Roux", value: "90" },
  { name: "Bleu", value: "240" },
];

export function IllustratedAvatarEditor({ member, onUpdate }: IllustratedAvatarEditorProps) {
  const [selectedHair, setSelectedHair] = useState<string | null>(member.current_hair || null);
  const [selectedClothes, setSelectedClothes] = useState<string | null>(member.current_clothes || null);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(member.current_accessory || null);
  const [hairColor, setHairColor] = useState<string>(member.current_hair_color || "0");

  const handleHairSelect = async (itemId: string) => {
    setSelectedHair(itemId);
    onUpdate({ current_hair: itemId });
  };

  const handleClothesSelect = async (itemId: string) => {
    setSelectedClothes(itemId);
    onUpdate({ current_clothes: itemId });
  };

  const handleAccessorySelect = async (itemId: string) => {
    setSelectedAccessory(itemId);
    onUpdate({ current_accessory: itemId });
  };

  const handleHairColorChange = (color: string) => {
    setHairColor(color);
    onUpdate({ current_hair_color: color });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <AvatarPreview 
          member={member}
          selectedHair={selectedHair}
          selectedClothes={selectedClothes}
          selectedAccessory={selectedAccessory}
          hairColor={hairColor}
          className="w-32 h-32"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Coiffure</Label>
          <AvatarItemSelector 
            type="hair"
            selectedItemId={selectedHair}
            onSelectItem={handleHairSelect}
          />
          
          <div className="mt-2">
            <Label>Couleur des cheveux</Label>
            <Select value={hairColor} onValueChange={handleHairColorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une couleur" />
              </SelectTrigger>
              <SelectContent>
                {hairColors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Vêtements</Label>
          <AvatarItemSelector 
            type="clothes"
            selectedItemId={selectedClothes}
            onSelectItem={handleClothesSelect}
          />
        </div>

        <div className="space-y-2">
          <Label>Accessoires</Label>
          <AvatarItemSelector 
            type="accessory"
            selectedItemId={selectedAccessory}
            onSelectItem={handleAccessorySelect}
          />
        </div>
      </div>
    </div>
  );
}
