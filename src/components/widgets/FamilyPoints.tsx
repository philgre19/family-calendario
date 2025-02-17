
import { Trophy } from "lucide-react";
import { useState } from "react";

export const FamilyPoints = () => {
  const [points, setPoints] = useState(45);
  const weeklyGoal = 100;
  const progress = (points / weeklyGoal) * 100;

  return (
    <div className="calendar-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Points Famille</h3>
        <Trophy className={`w-5 h-5 ${progress >= 100 ? 'text-yellow-500' : 'text-gray-400'}`} />
      </div>
      <div className="text-center mb-4">
        <span className="text-3xl font-bold">{points}</span>
        <span className="text-gray-500"> / {weeklyGoal}</span>
      </div>
      <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full transition-all duration-500"
          style={{ 
            width: `${Math.min(progress, 100)}%`,
            background: progress >= 100 ? 'rgb(234 179 8)' : 'rgb(59 130 246)'
          }}
        />
      </div>
      {progress >= 100 && (
        <div className="mt-4 text-center text-sm font-medium text-yellow-600">
          🎉 Objectif atteint ! Bravo la famille !
        </div>
      )}
    </div>
  );
};
