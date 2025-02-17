
import {
  Home,
  Calendar,
  CheckSquare,
  Utensils,
  ShoppingCart,
  Target,
  Trophy,
  Sun,
  DollarSign,
  MessageSquare,
  Image,
  MapPin,
  Settings,
  BarChart
} from "lucide-react";

type NavigationItem = {
  name: string;
  icon: typeof Home;
  path: string;
  hoverColor: string;
  badge?: {
    type: "warning" | "info" | "alert";
    count?: number;
    icon?: string;
  };
};

export const navigation: NavigationItem[] = [
  { 
    name: "Accueil", 
    icon: Home, 
    path: "/dashboard",
    hoverColor: "hover:bg-pastel-blue/50"
  },
  { 
    name: "Calendrier", 
    icon: Calendar, 
    path: "/calendar",
    hoverColor: "hover:bg-pastel-yellow/50"
  },
  { 
    name: "Tâches & Corvées", 
    icon: CheckSquare, 
    path: "/tasks",
    hoverColor: "hover:bg-pastel-orange/50",
    badge: {
      type: "warning",
      count: 2
    }
  },
  { 
    name: "Planification des Repas", 
    icon: Utensils, 
    path: "/meals",
    hoverColor: "hover:bg-pastel-green/50"
  },
  { 
    name: "Liste de Courses", 
    icon: ShoppingCart, 
    path: "/shopping-list",
    hoverColor: "hover:bg-pastel-purple/50"
  },
  { 
    name: "Suivi des Habitudes", 
    icon: Target, 
    path: "/habits",
    hoverColor: "hover:bg-pastel-pink/50"
  },
  { 
    name: "Gamification & Récompenses", 
    icon: Trophy, 
    path: "/gamification",
    hoverColor: "hover:bg-pastel-yellow/50"
  },
  { 
    name: "Météo", 
    icon: Sun, 
    path: "/weather",
    hoverColor: "hover:bg-pastel-blue/50",
    badge: {
      type: "alert",
      icon: "⚠️"
    }
  },
  { 
    name: "Tableau Financier", 
    icon: DollarSign, 
    path: "/finance",
    hoverColor: "hover:bg-pastel-green/50"
  },
  { 
    name: "Messagerie Familiale", 
    icon: MessageSquare, 
    path: "/chat",
    hoverColor: "hover:bg-pastel-purple/50",
    badge: {
      type: "info",
      count: 3
    }
  },
  { 
    name: "Album Photo & Moments", 
    icon: Image, 
    path: "/gallery",
    hoverColor: "hover:bg-pastel-pink/50"
  },
  { 
    name: "Localisation & Présence", 
    icon: MapPin, 
    path: "/location",
    hoverColor: "hover:bg-pastel-yellow/50"
  },
  { 
    name: "Paramètres", 
    icon: Settings, 
    path: "/settings",
    hoverColor: "hover:bg-pastel-blue/50"
  },
  { 
    name: "Statistiques & Analyses", 
    icon: BarChart, 
    path: "/stats",
    hoverColor: "hover:bg-pastel-purple/50"
  }
];
