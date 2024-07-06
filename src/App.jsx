import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutDashboard, Settings, LayoutTemplate } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar";
import Boards from "./pages/Boards";
import BoardView from "./pages/BoardView";
import SettingsPage from "./pages/Settings";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Boards",
    to: "/",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Templates",
    to: "/templates",
    icon: <LayoutTemplate className="h-4 w-4" />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Boards />} />
                <Route path="board/:id" element={<BoardView />} />
                <Route path="templates" element={<div>Templates Page</div>} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;