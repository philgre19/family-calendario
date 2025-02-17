
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const defaultTasks = [
  { id: 1, label: "Brossage des dents", completed: false },
  { id: 2, label: "Petit-déjeuner", completed: false },
  { id: 3, label: "S'habiller", completed: false },
  { id: 4, label: "Préparer le sac", completed: false },
];

export const MorningRoutine = () => {
  const [tasks, setTasks] = useState(defaultTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const progress = (tasks.filter(t => t.completed).length / tasks.length) * 100;

  return (
    <div className="calendar-card">
      <h3 className="text-lg font-medium mb-4">Routine du Matin</h3>
      <div className="space-y-3">
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`w-full flex items-center p-3 rounded-lg transition-all duration-300
                       ${task.completed ? 'bg-pastel-green/30' : 'bg-gray-50'}`}
          >
            <CheckCircle className={`w-5 h-5 mr-3 transition-colors
                                   ${task.completed ? 'text-green-500' : 'text-gray-300'}`} />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
