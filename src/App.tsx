
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-loaded components
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Calendar = lazy(() => import("@/pages/Calendar"));
const Tasks = lazy(() => import("@/pages/Tasks"));
const Meals = lazy(() => import("@/pages/Meals"));
const ShoppingList = lazy(() => import("@/pages/ShoppingList"));
const Habits = lazy(() => import("@/pages/Habits"));
const Gamification = lazy(() => import("@/pages/Gamification"));
const Weather = lazy(() => import("@/pages/Weather"));
const Finance = lazy(() => import("@/pages/Finance"));
const Chat = lazy(() => import("@/pages/Chat"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Location = lazy(() => import("@/pages/Location"));
const Settings = lazy(() => import("@/pages/Settings"));
const AppearanceSettings = lazy(() => import("@/pages/AppearanceSettings"));
const Stats = lazy(() => import("@/pages/Stats"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const UserSettings = lazy(() => import("@/pages/UserSettings"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen w-full bg-background">
    <div className="w-full max-w-md p-8 space-y-4">
      <Skeleton className="h-12 w-3/4 mx-auto rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <Skeleton className="h-40 w-full rounded-lg" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "/calendar",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Calendar />
      </Suspense>
    ),
  },
  {
    path: "/tasks",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Tasks />
      </Suspense>
    ),
  },
  {
    path: "/meals",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Meals />
      </Suspense>
    ),
  },
  {
    path: "/shopping-list",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ShoppingList />
      </Suspense>
    ),
  },
  {
    path: "/habits",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Habits />
      </Suspense>
    ),
  },
  {
    path: "/gamification",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Gamification />
      </Suspense>
    ),
  },
  {
    path: "/weather",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Weather />
      </Suspense>
    ),
  },
  {
    path: "/finance",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Finance />
      </Suspense>
    ),
  },
  {
    path: "/chat",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Chat />
      </Suspense>
    ),
  },
  {
    path: "/gallery",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Gallery />
      </Suspense>
    ),
  },
  {
    path: "/location",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Location />
      </Suspense>
    ),
  },
  {
    path: "/settings",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Settings />
      </Suspense>
    ),
  },
  {
    path: "/settings/appearance",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppearanceSettings />
      </Suspense>
    ),
  },
  {
    path: "/settings/users",
    element: (
      <Suspense fallback={<PageLoader />}>
        <UserSettings />
      </Suspense>
    ),
  },
  {
    path: "/stats",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Stats />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
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
