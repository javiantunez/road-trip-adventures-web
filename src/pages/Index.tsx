
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarCheck, ChevronRight, Map, Users } from "lucide-react";

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
];

const Index = () => {
  return (
    <>
      <Navbar />
      
      <main>
        <HeroSection
          title="Vive la aventura en dos ruedas"
          description="Organización de los mejores eventos mototurísticos en España. Rutas espectaculares, camaradería y experiencias inolvidables que no te puedes perder."
          backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
          buttonText="Próximos Eventos"
          buttonLink="/eventos"
          secondaryButtonText="Inscríbete"
          secondaryButtonLink="/inscribirse"
        />
        
        {/* About section */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Descubre MotoAventura
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Somos una empresa especializada en organizar eventos mototurísticos 
                  por toda España. Desde rutas de montaña hasta viajes costeros, 
                  ofrecemos experiencias únicas para los amantes de las dos ruedas.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Con más de 10 años de experiencia, nuestro equipo se dedica a 
                  diseñar rutas espectaculares, seleccionar los mejores alojamientos 
                  y crear un ambiente de camaradería entre todos los participantes.
                </p>
                <Button asChild className="bg-aventura-500 hover:bg-aventura-600">
                  <Link to="/nosotros">
                    Conoce más sobre nosotros
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc"
                  alt="Organizando eventos mototurísticos"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">¿Por qué elegir MotoAventura?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Organizamos eventos mototurísticos con la mayor atención al detalle para que vivas una experiencia inolvidable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 bg-[#E25A24]/10 text-[#E25A24] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Map className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Rutas Excepcionales</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Diseñamos cuidadosamente cada ruta para llevarte por los paisajes más espectaculares y las carreteras más emocionantes.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 bg-[#E25A24]/10 text-[#E25A24] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Grandes Compañías</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nuestros eventos atraen a motociclistas apasionados, creando un ambiente único de camaradería y amistad.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 bg-[#E25A24]/10 text-[#E25A24] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <CalendarCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Organización Perfecta</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nos encargamos de todos los detalles para que tú solo tengas que preocuparte de disfrutar de la experiencia.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming events section */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Próximos eventos</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  No te pierdas nuestras próximas aventuras
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/eventos">
                  Ver todos
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16 bg-aventura-600 text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">¿Qué dicen nuestros participantes?</h2>
              <p className="text-white/80 max-w-3xl mx-auto">
                Las opiniones de quienes ya han vivido la experiencia MotoAventura
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-black/90 mb-6">
                  "Una experiencia increíble. Rutas espectaculares, alojamientos de primera y un ambiente excepcional. Repetiré seguro en el próximo evento."
                </p>
                <div>
                  <h4 className="font-semibold text-black">Carlos Rodríguez</h4>
                  <p className="text-black/70 text-sm">Participante en Cantabria Challenge</p>
                </div>
              </div>
              
              <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-black/90 mb-6">
                  "Lo que más valoro es la organización. Todo perfectamente coordinado, desde las rutas hasta las comidas. Nunca había participado en un evento así y ahora estoy enganchada."
                </p>
                <div>
                  <h4 className="font-semibold text-black">Laura Martínez</h4>
                  <p className="text-black/70 text-sm">Participante en Pirineos Adventure</p>
                </div>
              </div>
              
              <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-black/90 mb-6">
                  "Mi tercera participación con MotoAventura y cada vez mejor. El equipo es fantástico y siempre están pendientes de cada detalle. Las rutas son sencillamente impresionantes."
                </p>
                <div>
                  <h4 className="font-semibold text-black">Miguel Ángel Fernández</h4>
                  <p className="text-black/70 text-sm">Participante habitual</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Past events section */}
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Eventos anteriores</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Revive algunas de nuestras aventuras pasadas
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/eventos/historico">
                  Ver histórico
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">¿Listo para tu próxima aventura?</h2>
              <p className="text-white/80 mb-8">
                Inscríbete ahora en nuestros próximos eventos y prepárate para vivir una experiencia única sobre dos ruedas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-aventura-500 hover:bg-aventura-600">
                  <Link to="/inscribirse">
                    Inscríbete ahora
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contacto">
                    Contacta con nosotros
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;

