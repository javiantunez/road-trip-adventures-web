
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Datos de ejemplo para eventos del usuario
const userEvents = [
  {
    id: "cantabria-challenge-2023",
    title: "III Cantabria Challenge",
    date: "11-12 Abril, 2023",
    location: "Hoznayo, Cantabria",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    status: "Completado",
  },
  {
    id: "pirineos-adventure",
    title: "Pirineos Adventure Tour",
    date: "5-7 Mayo, 2023",
    location: "Jaca, Huesca",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    status: "Inscrito",
  },
];

// Datos de ejemplo para noticias
const newsItems = [
  {
    id: 1,
    title: "Nuevas rutas confirmadas para 2023",
    date: "15 Marzo, 2023",
    excerpt: "Hemos confirmado cinco nuevas rutas espectaculares para este año. ¡No te las pierdas!",
    category: "Anuncios",
  },
  {
    id: 2,
    title: "Actualización de equipamiento recomendado",
    date: "10 Marzo, 2023",
    excerpt: "Hemos actualizado nuestra lista de equipamiento recomendado para los eventos de montaña.",
    category: "Equipamiento",
  },
  {
    id: 3,
    title: "Descuentos especiales para miembros",
    date: "5 Marzo, 2023",
    excerpt: "Los miembros registrados tienen un 15% de descuento en todos los accesorios durante marzo.",
    category: "Promociones",
  },
];

// Datos de ejemplo para notificaciones
const notifications = [
  {
    id: 1,
    title: "Apertura de inscripciones",
    message: "Ya están abiertas las inscripciones para la Costa Brava Ride 2023.",
    date: "Hace 2 días",
    isRead: false,
  },
  {
    id: 2,
    title: "Tu inscripción ha sido confirmada",
    message: "Tu inscripción para el evento Pirineos Adventure Tour ha sido confirmada.",
    date: "Hace 1 semana",
    isRead: true,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // Simular usuario logeado
  const user = {
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    avatar: "",
    role: "usuario"
  };

  return (
    <>
      <Navbar isLoggedIn={true} userName={user.name} />
      
      <main className="pt-20 min-h-screen">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Sección principal con pestañas */}
            <div className="w-full md:w-2/3">
              <div className="mb-6">
                <h1 className="text-3xl font-bold">Bienvenido, {user.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Accede a tus eventos, mensajes y toda la información exclusiva para usuarios registrados.
                </p>
              </div>
              
              <Tabs defaultValue="general" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="eventos">Mis Eventos</TabsTrigger>
                  <TabsTrigger value="noticias">Noticias</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-6">
                  {/* Próximos eventos del usuario */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-aventura-500" />
                        Próximos eventos
                      </CardTitle>
                      <CardDescription>
                        Eventos en los que estás inscrito o que podrían interesarte
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userEvents.slice(0, 2).map((event) => (
                          <div key={event.id} className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                              <span className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                                event.status === "Completado" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>{event.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" size="sm" className="ml-auto">
                        <Link to="/mis-eventos">
                          Ver todos mis eventos
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Últimas noticias */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-aventura-500" />
                        Últimas noticias
                      </CardTitle>
                      <CardDescription>
                        Información exclusiva para miembros registrados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {newsItems.slice(0, 2).map((news) => (
                          <div key={news.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium">{news.title}</h4>
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                                {news.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{news.excerpt}</p>
                            <p className="text-xs text-gray-500">{news.date}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" size="sm" className="ml-auto">
                        <Link to="/mensajes">
                          Ver todas las noticias
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="eventos" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mis eventos</CardTitle>
                      <CardDescription>
                        Historial completo de eventos en los que has participado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {userEvents.map((event) => (
                          <div key={event.id} className="flex flex-col md:flex-row gap-4 border-b pb-4 last:border-0">
                            <div className="h-40 md:h-24 md:w-40 rounded-md overflow-hidden">
                              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-xl font-bold">{event.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 my-1">{event.date} • {event.location}</p>
                              <span className={`text-xs px-2 py-1 rounded-full inline-block ${
                                event.status === "Completado" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>{event.status}</span>
                              <div className="mt-3">
                                <Button asChild size="sm">
                                  <Link to={`/eventos/${event.id}`}>
                                    Ver detalles
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="noticias" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Noticias y actualizaciones</CardTitle>
                      <CardDescription>
                        Información exclusiva para miembros registrados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {newsItems.map((news) => (
                          <div key={news.id} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold">{news.title}</h3>
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                                {news.category}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{news.excerpt}</p>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500">{news.date}</p>
                              <Button variant="link" size="sm" className="px-0">
                                Leer más
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Barra lateral */}
            <div className="w-full md:w-1/3 space-y-6">
              {/* Notificaciones */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-aventura-500" />
                    Notificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 rounded-lg border ${
                            notification.isRead ? 'bg-gray-50 dark:bg-gray-900' : 'bg-aventura-50 dark:bg-gray-800 border-aventura-200 dark:border-aventura-800'
                          }`}
                        >
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">No tienes notificaciones</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs w-full">
                    Ver todas
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Acciones rápidas */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Acciones rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/eventos">
                      <Calendar className="h-4 w-4 mr-2" />
                      Explorar eventos
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/perfil">
                      <User className="h-4 w-4 mr-2" />
                      Editar perfil
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/mis-facturas">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                        <rect width="16" height="20" x="4" y="2" rx="2" />
                        <path d="M8 10h8" />
                        <path d="M8 14h8" />
                        <path d="M8 18h5" />
                      </svg>
                      Mis facturas
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Próximo evento destacado */}
              <Card className="bg-gradient-to-br from-aventura-800 to-aventura-900 text-white">
                <CardHeader>
                  <CardTitle>Próximo evento destacado</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-2">Costa Brava Ride</h3>
                  <p className="text-aventura-100 mb-4">23-25 Junio, 2023 • Lloret de Mar, Girona</p>
                  <p className="text-sm text-aventura-200 mb-4">
                    Descubre las impresionantes vistas de la Costa Brava en este evento de 3 días.
                  </p>
                  <Button className="w-full bg-white text-aventura-800 hover:bg-aventura-100" size="sm">
                    Inscríbete ahora
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Dashboard;
