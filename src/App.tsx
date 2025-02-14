
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import Tasks from "@/pages/Tasks";
import AddTask from "@/pages/AddTask";
import AddEvent from "@/pages/AddEvent";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/ajouter-tache",
    element: <AddTask />,
  },
  {
    path: "/ajouter-evenement",
    element: <AddEvent />,
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
