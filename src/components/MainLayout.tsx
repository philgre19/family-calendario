import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "./ui/sidebar";
export const MainLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <SidebarProvider>
      <div className="h-screen w-screen flex overflow-hidden bg-[#0f31b3]">
        <Sidebar />
        <main className="flex-1 bg-white">
          <div className="h-full flex flex-col">
            <div className="flex-1 p-6 pb-8 overflow-auto px-0 mx-0">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};