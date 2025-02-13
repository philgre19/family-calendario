
import { Calendar, Home, ListTodo, Settings, Sun } from "lucide-react";
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

const navigation = [
  { name: "Accueil", icon: Home, path: "/" },
  { name: "Calendrier", icon: Calendar, path: "/calendar" },
  { name: "Tâches", icon: ListTodo, path: "/tasks" },
  { name: "Météo", icon: Sun, path: "/weather" },
  { name: "Paramètres", icon: Settings, path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`sidebar-link ${
                        location.pathname === item.path ? "active" : ""
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
};
