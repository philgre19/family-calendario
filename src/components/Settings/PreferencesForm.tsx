
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PreferencesFormProps {
  participateInQuests: boolean;
  questStyle: 'rpg' | 'neutral';
  onParticipateChange: (value: boolean) => void;
  onStyleChange: (value: 'rpg' | 'neutral') => void;
}

export function PreferencesForm({ 
  participateInQuests, 
  questStyle, 
  onParticipateChange, 
  onStyleChange 
}: PreferencesFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="quests-participation">Participer aux quêtes</Label>
          <Switch
            id="quests-participation"
            checked={participateInQuests}
            onCheckedChange={onParticipateChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quest-style">Style de langage</Label>
          <Select value={questStyle} onValueChange={(value) => onStyleChange(value as 'rpg' | 'neutral')}>
            <SelectTrigger id="quest-style">
              <SelectValue placeholder="Choisir un style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rpg">Style RPG (Quêtes, Missions, Défis)</SelectItem>
              <SelectItem value="neutral">Style neutre (Tâches, Routines, Objectifs)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
