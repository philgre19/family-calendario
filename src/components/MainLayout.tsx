
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { MemberBar } from "./MemberBar";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background slide-in-right">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="p-6 space-y-6">
              {/* En-tête avec bouton retour et barre des membres */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {!isHome && (
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="inline-flex items-center justify-center h-10 px-4 
                               bg-pastel-blue text-gray-800 rounded-lg transition-all
                               hover:bg-pastel-blue/80 hover:shadow-md active:scale-95"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      <span>Retour</span>
                    </button>
                  )}
                </div>
                <MemberBar />
              </div>
              {/* Contenu principal */}
              <div className="fade-in">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
