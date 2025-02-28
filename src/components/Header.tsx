
import { Sun, Trophy, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

interface HeaderProps {
  points: number;
  temperature: number;
  condition: "clear" | "cloudy" | "rain" | "snow";
  dailyWord: string;
  familyName?: string;
}

export function Header({ 
  points = 0, 
  temperature = 22, 
  condition = "clear", 
  dailyWord = "Détermination",
  familyName = "Famille Grenier"
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-sm mb-4">
      {/* Logo ou titre très succinct */}
      <h1 className="text-lg font-bold text-gray-900">{familyName}</h1>

      {/* Petit bloc d'infos */}
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mot du jour */}
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-medium">Mot du jour :</span>{" "}
          <span className="font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {dailyWord}
          </span>
        </div>

        {/* Météo */}
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span>{temperature}°C</span>
          {condition === "clear" && <Sun className="w-4 h-4 text-yellow-400" />}
        </div>

        {/* Points */}
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>{points}</span>
        </div>
      </motion.div>
    </header>
  );
}
