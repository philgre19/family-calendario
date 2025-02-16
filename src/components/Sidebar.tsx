
import {
  Calendar,
  Home,
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
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Accueil", icon: Home, path: "/dashboard" },
  { name: "Calendrier", icon: Calendar, path: "/calendar" },
  { name: "Tâches & Corvées", icon: CheckSquare, path: "/tasks" },
  { name: "Planification des Repas", icon: Utensils, path: "/meals" },
  { name: "Liste de Courses", icon: ShoppingCart, path: "/shopping-list" },
  { name: "Suivi des Habitudes", icon: Target, path: "/habits" },
  { name: "Gamification & Récompenses", icon: Trophy, path: "/gamification" },
  { name: "Météo", icon: Sun, path: "/weather" },
  { name: "Tableau Financier", icon: DollarSign, path: "/finance" },
  { name: "Messagerie Familiale", icon: MessageSquare, path: "/chat" },
  { name: "Album Photo & Moments", icon: Image, path: "/gallery" },
  { name: "Localisation & Présence", icon: MapPin, path: "/location" },
  { name: "Paramètres", icon: Settings, path: "/settings" },
  { name: "Statistiques & Analyses", icon: BarChart, path: "/stats" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <TooltipProvider>
      <SidebarContainer>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="sr-only">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.path}
                            className={`sidebar-link ${
                              location.pathname === item.path ? "active" : ""
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="sr-only">{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">
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

