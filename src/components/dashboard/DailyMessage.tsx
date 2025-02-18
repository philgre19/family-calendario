
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const messages = [
  { word: "Détermination", emoji: "💪", definition: "La force de continuer malgré les obstacles" },
  { word: "Curiosité", emoji: "🌱", definition: "L'envie d'apprendre et de découvrir" },
  { word: "Bienveillance", emoji: "❤️", definition: "Prendre soin des autres avec gentillesse" },
  { word: "Créativité", emoji: "🎨", definition: "Imaginer et inventer de nouvelles choses" },
  { word: "Persévérance", emoji: "🎯", definition: "Ne jamais abandonner ses objectifs" }
];

export function DailyMessage() {
  const [currentMessage, setCurrentMessage] = useState(() => {
    const today = new Date().toDateString();
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  });

  const refreshMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);
  };

  return (
    <Card className="relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Mot du jour</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={refreshMessage}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              {currentMessage.word}
            </span>
            <span className="text-2xl">{currentMessage.emoji}</span>
          </div>
          <p className="text-gray-600">{currentMessage.definition}</p>
        </div>
        <div className="absolute bottom-2 right-2">
          <Sparkles className="w-5 h-5 text-yellow-400 opacity-50 animate-pulse" />
        </div>
      </div>
    </Card>
  );
}
