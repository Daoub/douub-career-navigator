import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/components/TranslationProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Resume from "./pages/Resume";
import Communities from "./pages/Communities";
import Consultations from "./pages/Consultations";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import Meetings from "./pages/Meetings";
import Learning from "./pages/Learning";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
const queryClient = new QueryClient();
const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <header className="h-12 flex items-center border-b bg-card/80 backdrop-blur-sm px-4 sticky top-0 z-40">
                    <SidebarTrigger className="ml-2" />
                  </header>
                  <main className="flex-1 overflow-auto">
                    <ErrorBoundary>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/resume" element={<Resume />} />
                        <Route path="/communities" element={<Communities />} />
                        <Route path="/meetings" element={<Meetings />} />
                        <Route path="/learning" element={<Learning />} />
                        <Route path="/consultations" element={<Consultations />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </ErrorBoundary>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </TranslationProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
export default App;