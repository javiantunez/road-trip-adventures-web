
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import { CalendarCheck, Clock, MapPin, Users } from "lucide-react";

// Mock event data
const eventData = {
  "cantabria-challenge-2023": {
    id: "cantabria-challenge-2023",
    title: "III Cantabria Challenge",
    date: "11-12 Abril, 2023",
    location: "Hoznayo, Cantabria",
    heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Volvemos a Hoznayo, un lugar que nos recibió en 2018 y al que estábamos deseando volver. Prepárate para un fin de semana increíble lleno de aventura, paisajes espectaculares y gastronomía inigualable. Si es tu primera vez, te sorprenderás con las maravillosas carreteras de Cantabria.",
    schedule: [
      {
        day: "Día 1 - 11 de Abril",
        activities: [
          { time: "08:00", description: "Recepción de participantes y entrega de welcome pack" },
          { time: "09:00", description: "Briefing y presentación del evento" },
          { time: "09:30", description: "Inicio de la ruta - Etapa montañosa" },
          { time: "13:30", description: "Parada para comer en Restaurante El Mirador" },
          { time: "15:00", description: "Continuación de la ruta - Etapa costera" },
          { time: "19:00", description: "Llegada al hotel y tiempo libre" },
          { time: "21:00", description: "Cena de grupo (opcional)" },
        ]
      },
      {
        day: "Día 2 - 12 de Abril",
        activities: [
          { time: "08:30", description: "Desayuno en el hotel" },
          { time: "09:30", description: "Inicio de la ruta - Parque Natural" },
          { time: "13:00", description: "Parada para comer en Restaurante Casa Pedro" },
          { time: "14:30", description: "Continuación de la última etapa" },
          { time: "17:00", description: "Llegada a Hoznayo - Entrega de diplomas" },
          { time: "18:00", description: "Despedida y fin del evento" },
        ]
      }
    ],
    registrationInfo: {
      dates: [
        { period: "Hasta el 19 de Marzo", categories: [
          { name: "Platino (+20 pruebas)", price: "57 €" },
          { name: "Oro (+10 pruebas)", price: "60 €" },
          { name: "Veteranos (<10 pruebas)", price: "63 €" },
          { name: "General (primera prueba)", price: "65 €" },
        ]},
        { period: "19 Marzo - 31 Marzo", categories: [
          { name: "Precio único", price: "70 €" },
        ]},
      ],
      closing: "Cierre de inscripciones: 31 de Marzo",
      lateRegistration: "Inscripciones fuera de plazo: 70 € (sin welcome pack, según disponibilidad)"
    },
    details: {
      startPoint: "Hoznayo, Plaza Mayor",
      endPoint: "Hoznayo, Plaza Mayor",
      totalDistance: "420 km",
      difficulty: "Media",
      maxParticipants: "200",
      terrainType: "Mixto (asfalto, algunas pistas)",
    },
    gallery: [
      { id: "img1", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", alt: "Montañas de Cantabria" },
      { id: "img2", url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb", alt: "Carreteras serpenteantes" },
      { id: "img3", url: "https://images.unsplash.com/photo-1472396961693-142e6e269027", alt: "Motos en ruta" },
      { id: "img4", url: "https://images.unsplash.com/photo-1578389285553-8883f4c3ba44", alt: "Paisaje costero" },
      { id: "img5", url: "https://images.unsplash.com/photo-1661170913176-9915de038e9a", alt: "Grupo de motociclistas" },
      { id: "img6", url: "https://images.unsplash.com/photo-1589674781759-c21c37956a44", alt: "Parada en mirador" },
    ]
  },
  // Más eventos aquí...
};

const EventoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? eventData[id as keyof typeof eventData] : null;
  
  if (!event) {
    return (
      <>
        <Navbar />
        <div className="container py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Evento no encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Lo sentimos, el evento que buscas no existe o ha sido eliminado.
          </p>
          <Button asChild>
            <Link to="/eventos">Volver a eventos</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.heroImage})` }}
          >
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          
          <div className="container relative h-full flex items-end pb-12 z-10">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {event.title}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-white/90">
                <div className="flex items-center">
                  <CalendarCheck className="h-5 w-5 mr-2 text-aventura-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-aventura-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-aventura-400" />
                  <span>200 plazas disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event content */}
        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main content */}
              <div className="w-full lg:w-2/3">
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="info" className="text-base">Información</TabsTrigger>
                    <TabsTrigger value="schedule" className="text-base">Programa</TabsTrigger>
                    <TabsTrigger value="gallery" className="text-base">Galería</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">¿Te vienes con nosotros a la III CANTABRIA CHALLENGE?</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {event.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Detalles del evento</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Punto de salida</div>
                          <div className="font-medium">{event.details.startPoint}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Punto de llegada</div>
                          <div className="font-medium">{event.details.endPoint}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Distancia total</div>
                          <div className="font-medium">{event.details.totalDistance}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Dificultad</div>
                          <div className="font-medium">{event.details.difficulty}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Plazas disponibles</div>
                          <div className="font-medium">{event.details.maxParticipants}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Tipo de terreno</div>
                          <div className="font-medium">{event.details.terrainType}</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule">
                    <div className="space-y-10">
                      {event.schedule.map((day, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-bold mb-4">{day.day}</h3>
                          <div className="space-y-4">
                            {day.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex">
                                <div className="w-20 flex-shrink-0">
                                  <div className="flex items-center h-full">
                                    <Clock className="h-4 w-4 mr-2 text-aventura-500" />
                                    <span className="font-medium">{activity.time}</span>
                                  </div>
                                </div>
                                <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-6 pb-6">
                                  <div className="text-gray-700 dark:text-gray-300">
                                    {activity.description}
                                  </div>
                                  {actIndex < day.activities.length - 1 && (
                                    <div className="absolute w-3 h-3 bg-aventura-500 rounded-full mt-4 -ml-[27px]"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gallery">
                    <ImageGallery images={event.gallery} title="Fotos del evento" />
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Inscripción</h3>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold">Plazas limitadas</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      ¡Solo 200 plazas disponibles para garantizar la mejor experiencia!
                    </p>
                    
                    <h4 className="font-semibold mt-4">Precios y plazos de inscripción</h4>
                    {event.registrationInfo.dates.map((dateRange, index) => (
                      <div key={index} className="mb-4">
                        <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">{dateRange.period}</h5>
                        <ul className="mt-2 space-y-1">
                          {dateRange.categories.map((category, catIndex) => (
                            <li key={catIndex} className="flex justify-between">
                              <span>{category.name}</span>
                              <span className="font-semibold">{category.price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {event.registrationInfo.closing}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h5 className="font-semibold">Inscripciones fuera de plazo</h5>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                        En función de disponibilidad.
                      </p>
                      <p className="mt-2">
                        <span>Precio único: 70 € (sin welcome pack).</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Se intentará incluir en la comida según plazas disponibles.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h5 className="font-semibold">Apertura y cierre de inscripciones</h5>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>06 a 19 de Marzo: Inscripción anticipada</li>
                        <li>19 a 31 de Marzo: Inscripción general</li>
                        <li>Cierre: 31 de Marzo o hasta completar plazas</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-aventura-500 hover:bg-aventura-600">
                    <Link to={`/inscribirse/${event.id}`}>
                      Quiero inscribirme
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Contacto</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    ¿Tienes alguna pregunta sobre este evento? No dudes en contactarnos.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contacto">
                      Contactar
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default EventoDetalle;
