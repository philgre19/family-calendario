
import { Calendar, Home, CheckSquare, Utensils, ShoppingCart, Target, Trophy, Sun, DollarSign, MessageSquare, Image, MapPin, Settings, BarChart } from "lucide-react";
import { Sidebar as SidebarContainer, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navigation = [
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

export const Sidebar = () => {
  const location = useLocation();

  return (
    <TooltipProvider>
      <SidebarContainer className="w-[60px] fixed left-0 top-0 h-screen z-50">
        <SidebarContent>
          <SidebarGroup className="bg-[#0f31b3]/90 backdrop-blur-sm px-0 rounded-3xl mx-2 mt-2">
            <SidebarGroupLabel className="sr-only">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name} className="relative">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.path}
                            className={`sidebar-link group ${item.hoverColor} ${
                              location.pathname === item.path ? "active" : ""
                            }`}
                          >
                            <item.icon className="h-5 w-5 text-gray-100 transition-transform group-hover:scale-110" />
                            <span className="sr-only">{item.name}</span>
                            {item.badge && (
                              <span className={`absolute -top-1 -right-1 ${
                                item.badge.type === 'warning' ? 'bg-red-500' :
                                item.badge.type === 'info' ? 'bg-blue-500' :
                                'bg-yellow-500'
                              } text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center p-0.5 scale-in`}>
                                {item.badge.count || item.badge.icon}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-white/90 backdrop-blur-sm">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarContainer>
    </TooltipProvider>
  );
};
