
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import HeroSection from "@/components/HeroSection";
import { CalendarCheck, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: "cantabria-challenge-2023",
    title: "III Cantabria Challenge",
    date: "11-12 Abril, 2023",
    location: "Hoznayo, Cantabria",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },
  {
    id: "pirineos-adventure",
    title: "Pirineos Adventure Tour",
    date: "5-7 Mayo, 2023",
    location: "Jaca, Huesca",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
  },
  {
    id: "costa-brava-ride",
    title: "Costa Brava Ride",
    date: "23-25 Junio, 2023",
    location: "Lloret de Mar, Girona",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    id: "galicia-explorer",
    title: "Galicia Explorer",
    date: "15-17 Julio, 2023",
    location: "Santiago de Compostela",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a",
  },
  {
    id: "andalucia-tour",
    title: "Andalucía Tour",
    date: "9-11 Septiembre, 2023",
    location: "Sevilla",
    image: "https://images.unsplash.com/photo-1504198453481-3d2e2d2b1e9f",
  },
  {
    id: "madrid-mountains",
    title: "Madrid Mountains",
    date: "14-15 Octubre, 2023",
    location: "Sierra de Guadarrama",
    image: "https://images.unsplash.com/photo-1578378161164-40d14aa02ea9",
  },
];

// Mock data for past events
const pastEvents = [
  {
    id: "asturias-coast-tour",
    title: "Asturias Coast Tour",
    date: "15-17 Septiembre, 2022",
    location: "Gijón, Asturias",
    image: "https://images.unsplash.com/photo-1587131751869-22aa7b0f9c3b",
    isPast: true,
  },
  {
    id: "sierra-nevada-expedition",
    title: "Sierra Nevada Expedition",
    date: "8-10 Julio, 2022",
    location: "Granada",
    image: "https://images.unsplash.com/photo-1570608119397-2247ea02b199",
    isPast: true,
  },
  {
    id: "cantabria-challenge-2022",
    title: "II Cantabria Challenge",
    date: "12-14 Abril, 2022",
    location: "Hoznayo, Cantabria",
    image: "https://images.unsplash.com/photo-1506048346744-8b55f1631786",
    isPast: true,
  },
  {
    id: "pyrenees-crossing",
    title: "Pyrenees Crossing",
    date: "4-6 Junio, 2022",
    location: "Andorra",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    isPast: true,
  },
  {
    id: "mallorca-coast",
    title: "Mallorca Coast Route",
    date: "10-12 Marzo, 2022",
    location: "Palma de Mallorca",
    image: "https://images.unsplash.com/photo-1616859160587-3c841968ae3e",
    isPast: true,
  },
  {
    id: "extremadura-adventure",
    title: "Extremadura Adventure",
    date: "18-20 Febrero, 2022",
    location: "Cáceres",
    image: "https://images.unsplash.com/photo-1523204326612-ac4d991d1f0d",
    isPast: true,
  },
  {
    id: "cantabria-challenge-2021",
    title: "I Cantabria Challenge",
    date: "10-12 Abril, 2021",
    location: "Hoznayo, Cantabria",
    image: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59",
    isPast: true,
  },
  {
    id: "aragon-curves",
    title: "Aragón Curves",
    date: "5-7 Junio, 2021",
    location: "Teruel",
    image: "https://images.unsplash.com/photo-1538427144912-94dfba99834f",
    isPast: true,
  },
];

// Function to filter events based on search query
const filterEvents = (events: any[], query: string) => {
  if (!query) return events;
  
  const lowercaseQuery = query.toLowerCase();
  return events.filter(
    (event) => 
      event.title.toLowerCase().includes(lowercaseQuery) || 
      event.location.toLowerCase().includes(lowercaseQuery) ||
      event.date.toLowerCase().includes(lowercaseQuery)
  );
};

const Eventos = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  
  const filteredEvents = activeTab === "upcoming" 
    ? filterEvents(upcomingEvents, searchQuery)
    : filterEvents(pastEvents, searchQuery);
    
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      
      <main>
        <HeroSection
          title="Eventos Mototurísticos"
          description="Descubre todos nuestros eventos actuales y pasados. Rutas espectaculares, camaradería y experiencias inolvidables que no te puedes perder."
          backgroundImage="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
        />
        
        <section className="py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Eventos</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Encuentra próximos eventos o explora nuestro histórico
                </p>
              </div>
              
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar eventos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="upcoming" className="text-base">
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Próximos eventos
                </TabsTrigger>
                <TabsTrigger value="past" className="text-base">
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Eventos pasados
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-semibold mb-2">No se encontraron eventos</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No hay eventos que coincidan con tu búsqueda.
                    </p>
                    <Button onClick={() => setSearchQuery("")}>
                      Mostrar todos los eventos
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-semibold mb-2">No se encontraron eventos</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No hay eventos pasados que coincidan con tu búsqueda.
                    </p>
                    <Button onClick={() => setSearchQuery("")}>
                      Mostrar todos los eventos
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Eventos;
