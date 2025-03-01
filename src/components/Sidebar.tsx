
import { navigation } from "./navigation";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";

export const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { settings } = useSettings();
  const sidebarColor = settings?.sidebar_color || "#0f31b3";

  return (
    <TooltipProvider>
      <SidebarContainer className="w-16 h-full">
        <SidebarContent className="h-full flex items-center">
          <SidebarGroup className="h-full flex flex-col w-full" style={{ backgroundColor: sidebarColor }}>
            <SidebarGroupContent className="h-full py-2">
              <SidebarMenu className="h-full grid grid-cols-1 auto-rows-fr">
                {navigation.map((item) => (
                  <SidebarMenuItem
                    key={item.name}
                    className="relative flex items-center justify-center group"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.path}
                          className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                            item.hoverColor
                          } ${
                            location.pathname === item.path
                              ? "bg-blue-900"
                              : "hover:bg-blue-800"
                          }`}
                        >
                          <item.icon className="h-6 w-6 text-gray-100 transition-transform transform group-hover:scale-110" />
                          {item.badge && (
                            <span
                              className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-3.5 text-[8px] font-bold text-white rounded-full px-1 ${
                                item.badge.type === "warning"
                                  ? "bg-red-500"
                                  : item.badge.type === "info"
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                              } ${
                                item.badge.type === "alert"
                                  ? "animate-pulse"
                                  : ""
                              }`}
                            >
                              {item.badge.count || item.badge.icon}
                            </span>
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-white text-black px-2 py-1 rounded-lg shadow-md text-xs"
                        sideOffset={5}
                      >
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
