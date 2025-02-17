
import { Clock } from "lucide-react";
import { useState } from "react";

const members = [
  { id: 1, name: "Emma", timeSpent: 45, limit: 120 },
  { id: 2, name: "Lucas", timeSpent: 90, limit: 120 },
  { id: 3, name: "Sophie", timeSpent: 30, limit: 120 },
];

export const ScreenTime = () => {
  const [screenTimes, setScreenTimes] = useState(members);

  const getStatusColor = (timeSpent: number, limit: number) => {
    const ratio = timeSpent / limit;
    if (ratio < 0.5) return "text-green-500";
    if (ratio < 0.8) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="calendar-card">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium">Temps d'Écran</h3>
      </div>
      <div className="space-y-4">
        {screenTimes.map(member => {
          const progress = (member.timeSpent / member.limit) * 100;
          return (
            <div key={member.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{member.name}</span>
                <span className={`${getStatusColor(member.timeSpent, member.limit)}`}>
                  {member.timeSpent} min
                </span>
              </div>
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: progress < 50 ? '#10B981' : progress < 80 ? '#F59E0B' : '#EF4444'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
