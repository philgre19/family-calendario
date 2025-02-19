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
} from "@/components/ui/tooltip"; // Assure-toi que ce chemin est correct
import { useState } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <SidebarContainer className="w-[90px] fixed left-0 top-0 h-screen z-50">
        <SidebarContent className="h-full flex items-center overflow-hidden">
          <SidebarGroup className="bg-[#0f31b3] px-0 mx-0 h-full flex flex-col justify-between py-2 shadow-xl">
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem
                    key={item.name}
                    className="relative my-0 flex items-center justify-center group"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.path}
                          className={`relative flex items-center justify-center w-12 h-12 transition-all duration-300 ${
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
                              className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-white rounded-full px-1 py-[1px] ${
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
                        className="custom-tooltip slide-tooltip bg-white text-black px-3 py-1 rounded-lg shadow-md text-sm"
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
