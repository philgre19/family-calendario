
import { useState } from "react";
import { Member } from "@/types/database.types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AvatarItemSelector } from "./AvatarItemSelector";

interface IllustratedAvatarEditorProps {
  member: Member;
  onUpdate: (updates: Partial<Member>) => void;
  currentItems: Partial<Member>;
}

const hairColors = [
  { name: "Noir", value: "0" },
  { name: "Brun", value: "30" },
  { name: "Blond", value: "60" },
  { name: "Roux", value: "90" },
  { name: "Bleu", value: "240" },
];

export function IllustratedAvatarEditor({ 
  member, 
  onUpdate,
  currentItems 
}: IllustratedAvatarEditorProps) {
  const [selectedHair, setSelectedHair] = useState<string | null>(currentItems.current_hair || null);
  const [selectedClothes, setSelectedClothes] = useState<string | null>(currentItems.current_clothes || null);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(currentItems.current_accessory || null);
  const [hairColor, setHairColor] = useState<string>(currentItems.current_hair_color || "0");

  const handleHairSelect = (itemId: string) => {
    setSelectedHair(itemId);
    onUpdate({ current_hair: itemId });
  };

  const handleClothesSelect = (itemId: string) => {
    setSelectedClothes(itemId);
    onUpdate({ current_clothes: itemId });
  };

  const handleAccessorySelect = (itemId: string) => {
    setSelectedAccessory(itemId);
    onUpdate({ current_accessory: itemId });
  };

  const handleHairColorChange = (color: string) => {
    setHairColor(color);
    onUpdate({ current_hair_color: color });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-lg font-medium text-purple-700">Coiffure</Label>
          <AvatarItemSelector 
            type="hair"
            selectedItemId={selectedHair}
            onSelectItem={handleHairSelect}
          />
          
          <div className="mt-2">
            <Label className="text-lg font-medium text-purple-700">Couleur des cheveux</Label>
            <Select value={hairColor} onValueChange={handleHairColorChange}>
              <SelectTrigger className="bg-white/50">
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
          <Label className="text-lg font-medium text-purple-700">Vêtements</Label>
          <AvatarItemSelector 
            type="clothes"
            selectedItemId={selectedClothes}
            onSelectItem={handleClothesSelect}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-lg font-medium text-purple-700">Accessoires</Label>
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
