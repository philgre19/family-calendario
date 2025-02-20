
import { MemberBar } from "./MemberBar";
import { useLocation } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
      <main className="flex-1 bg-white">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100/10">
            <MemberBar />
          </div>
          <div className="flex-1 p-6 pb-8 overflow-auto">{children}</div>
        </div>
      </main>
    </div>
  );
};
