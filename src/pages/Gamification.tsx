
import { MainLayout } from "@/components/MainLayout";
import { Trophy, Award, Star, Gift } from "lucide-react";

const badges = [
  { id: 1, name: "Premier Pas", icon: "🎯", description: "Première tâche complétée", unlocked: true },
  { id: 2, name: "Super Organisé", icon: "📅", description: "7 jours de routine parfaite", unlocked: true },
  { id: 3, name: "Champion Famille", icon: "🏆", description: "1000 points accumulés", unlocked: false },
];

const weeklyChallenge = {
  title: "Défi de la Semaine",
  description: "Accomplir toutes les routines matinales en famille",
  progress: 75,
  reward: "Soirée Pizza & Film"
};

const rewards = [
  "Sortie au parc",
  "Soirée jeux de société",
  "Choix du dessert",
  "30min de temps d'écran bonus"
];

export default function Gamification() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Gamification & Récompenses</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Score Maison */}
          <div className="calendar-card">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <h2 className="text-xl font-medium">Score de la Maison</h2>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">758</span>
                </div>
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-current text-gray-100"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-current text-yellow-500"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - 0.758)}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Prochain palier : 1000 points</p>
            </div>
          </div>

          {/* Défi Hebdomadaire */}
          <div className="calendar-card">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-medium">{weeklyChallenge.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{weeklyChallenge.description}</p>
            <div className="bg-gray-100 rounded-full h-3 mb-4">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${weeklyChallenge.progress}%` }}
              />
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-orange-800">
                🎁 Récompense : {weeklyChallenge.reward}
              </p>
            </div>
          </div>

          {/* Badges & Succès */}
          <div className="calendar-card">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-medium">Badges & Succès</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {badges.map(badge => (
                <div 
                  key={badge.id}
                  className={`p-4 rounded-lg ${
                    badge.unlocked ? 'bg-purple-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <h3 className="font-medium mb-1">{badge.name}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Récompenses */}
          <div className="calendar-card">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-pink-500" />
              <h2 className="text-xl font-medium">Mini Récompenses</h2>
            </div>
            <div className="space-y-3">
              {rewards.map((reward, index) => (
                <div 
                  key={index}
                  className="p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <p className="font-medium">{reward}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
