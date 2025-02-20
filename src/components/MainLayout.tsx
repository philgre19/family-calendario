
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { MemberBar } from "./MemberBar";
import { useLocation } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="h-screen w-screen flex overflow-hidden bg-[#0f31b3]">
        <Sidebar />
        <main className="flex-1 flex-shrink-0">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <MemberBar />
            </div>
            <div className="flex-1 px-4 pb-8 overflow-auto">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
