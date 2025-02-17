
import { Edit, RefreshCw } from "lucide-react";
import { useState } from "react";

const quotes = [
  "La joie de la famille est notre plus grand bonheur !",
  "Ensemble, on va plus loin !",
  "Un petit effort chaque jour fait de grandes réussites !",
  "Le sourire est le plus beau des cadeaux !",
];

export const DailyMessage = () => {
  const [message, setMessage] = useState(quotes[0]);
  const [isEditing, setIsEditing] = useState(false);

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setMessage(quotes[randomIndex]);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 shadow-sm slide-in-top">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 font-medium"
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <p className="text-gray-700 font-medium">{message}</p>
        )}
        <div className="flex items-center gap-1.5 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={generateRandomQuote}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
