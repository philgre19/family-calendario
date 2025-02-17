
import { Target } from "lucide-react";
import { useState } from "react";

export const DailyGoal = () => {
  const [goal, setGoal] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="calendar-card">
      <h3 className="text-lg font-medium mb-4">Objectif du Jour</h3>
      {!goal ? (
        <input
          type="text"
          placeholder="Définir un objectif..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isCompleted ? 'bg-pastel-green/30' : 'bg-gray-50'}`}>
            <p className="font-medium">{goal}</p>
          </div>
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`w-full p-3 rounded-lg transition-colors
                       ${isCompleted ? 'bg-green-500 text-white' : 'bg-pastel-blue text-gray-700'}`}
          >
            {isCompleted ? "Objectif atteint ! 🎉" : "Marquer comme terminé"}
          </button>
        </div>
      )}
    </div>
  );
};
