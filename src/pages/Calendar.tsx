
import { MainLayout } from "@/components/MainLayout";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { DailyMessage } from "@/components/dashboard/DailyMessage";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { AnimatePresence, motion } from "framer-motion";

export default function Calendar() {
  return (
    <MainLayout>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar compacte avec résumé */}
        <motion.aside 
          className="w-60 bg-white border-r border-gray-100 p-4 shrink-0 overflow-y-auto transition-all duration-300 ease-in-out"
          initial={{ width: 60 }}
          animate={{ width: 60 }}
          whileHover={{ width: 240 }}
        >
          <div className="space-y-4">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <DailyMessage />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <WeatherCard />
            </div>
          </div>
        </motion.aside>

        {/* Zone principale du calendrier */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CalendarView />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
}
