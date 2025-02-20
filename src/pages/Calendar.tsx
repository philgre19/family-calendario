
import { MainLayout } from "@/components/MainLayout";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { DailyMessage } from "@/components/dashboard/DailyMessage";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { AnimatePresence, motion } from "framer-motion";

export default function Calendar() {
  return (
    <MainLayout>
      <div className="flex h-screen overflow-hidden">
        {/* Zone principale du calendrier */}
        <div className="flex-1 overflow-hidden px-6">
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
