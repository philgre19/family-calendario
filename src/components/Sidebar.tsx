import { navigation } from "./navigation";
import { Sidebar as SidebarContainer, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
export const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  return <TooltipProvider>
      <SidebarContainer className="w-16 h-full">
        <SidebarContent className="h-full">
          <SidebarGroup className="h-full flex flex-col justify-between w-full px-[30px] py-0 mx-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map(item => <SidebarMenuItem key={item.name} className="relative my-1 flex items-center justify-center group" onMouseEnter={() => setHoveredItem(item.name)} onMouseLeave={() => setHoveredItem(null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={item.path} className={`relative flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-all duration-300 ${item.hoverColor} ${location.pathname === item.path ? "bg-blue-900" : "hover:bg-blue-800"}`}>
                          <item.icon className="h-5 w-5 text-gray-100 transition-transform transform group-hover:scale-110" />
                          {item.badge && <span className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 text-[10px] font-bold text-white rounded-full px-1 ${item.badge.type === "warning" ? "bg-red-500" : item.badge.type === "info" ? "bg-blue-500" : "bg-yellow-500"} ${item.badge.type === "alert" ? "animate-pulse" : ""}`}>
                              {item.badge.count || item.badge.icon}
                            </span>}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-white text-black px-3 py-1 rounded-lg shadow-md text-sm" sideOffset={5}>
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarContainer>
    </TooltipProvider>;
};