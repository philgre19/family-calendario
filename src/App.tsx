
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import Dashboard from "@/pages/Dashboard";
import Calendar from "@/pages/Calendar";
import Tasks from "@/pages/Tasks";
import Meals from "@/pages/Meals";
import ShoppingList from "@/pages/ShoppingList";
import Habits from "@/pages/Habits";
import Gamification from "@/pages/Gamification";
import Weather from "@/pages/Weather";
import Finance from "@/pages/Finance";
import Chat from "@/pages/Chat";
import Gallery from "@/pages/Gallery";
import Location from "@/pages/Location";
import Settings from "@/pages/Settings";
import AppearanceSettings from "@/pages/AppearanceSettings";
import Stats from "@/pages/Stats";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/meals",
    element: <Meals />,
  },
  {
    path: "/shopping-list",
    element: <ShoppingList />,
  },
  {
    path: "/habits",
    element: <Habits />,
  },
  {
    path: "/gamification",
    element: <Gamification />,
  },
  {
    path: "/weather",
    element: <Weather />,
  },
  {
    path: "/finance",
    element: <Finance />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/location",
    element: <Location />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/settings/appearance",
    element: <AppearanceSettings />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
