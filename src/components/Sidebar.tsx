
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

export const Sidebar = () => {
  const location = useLocation();

  return (
    <TooltipProvider>
      <SidebarContainer className="w-[70px] fixed left-0 top-0 h-screen z-50">
        <SidebarContent className="h-full flex items-center">
          <SidebarGroup className="bg-[#0f31b3]/90 backdrop-blur-sm px-0 rounded-3xl mx-2 h-[94vh]
                                  flex flex-col justify-between py-2">
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name} className="relative my-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.path}
                          className={`sidebar-link group ${item.hoverColor} ${
                            location.pathname === item.path ? "active" : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4 text-gray-100 transition-all duration-200 
                                              group-hover:scale-110 group-hover:drop-shadow-glow" />
                          {item.badge && (
                            <span className={`badge ${
                              item.badge.type === 'warning' ? 'bg-red-500' :
                              item.badge.type === 'info' ? 'bg-blue-500' :
                              'bg-yellow-500'
                            } text-white text-[10px] font-semibold
                              ${item.badge.type === 'alert' ? 'animate-pulse' : ''}`}>
                              {item.badge.count || item.badge.icon}
                            </span>
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="custom-tooltip slide-tooltip"
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
