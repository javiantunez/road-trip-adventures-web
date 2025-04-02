
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Eventos from "./pages/Eventos";
import EventoDetalle from "./pages/EventoDetalle";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Inscripcion from "./pages/Inscripcion";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:id" element={<EventoDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inscribirse/:id" element={<Inscripcion />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Dashboard />} />
          <Route path="/mis-eventos" element={<Dashboard />} />
          <Route path="/mensajes" element={<Dashboard />} />
          <Route path="/mis-facturas" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
