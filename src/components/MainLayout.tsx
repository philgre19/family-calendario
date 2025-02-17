
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { MemberBar } from "./MemberBar";
import { useLocation } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="h-screen w-screen flex overflow-hidden bg-background">
        <Sidebar />
        <main className="flex-1 relative ml-[90px]">
          <div className="h-full flex flex-col max-w-[calc(100vw-90px)]">
            <div className="flex items-center justify-between px-8 py-3 border-b border-gray-100/10">
              <MemberBar />
            </div>
            <div className="flex-1 overflow-hidden p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
