
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Map, Menu, X, User, Calendar, MessageSquare } from "lucide-react";
import UserMenu from "./UserMenu";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Navbar = ({ isLoggedIn = false, userName = "", userAvatar = "" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/bdfa6575-9eef-43e6-b578-3034a149fd57.png" 
            alt="IBS Moto Experiences Logo" 
            className="h-10"
          />
          <span className="text-xl font-bold font-montserrat tracking-wider text-white">IBS Moto Experiences</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/90 hover:text-ibs-500 font-medium">Inicio</Link>
          <Link to="/nosotros" className="text-white/90 hover:text-ibs-500 font-medium">Quiénes Somos</Link>
          <Link to="/eventos" className="text-white/90 hover:text-ibs-500 font-medium">Eventos</Link>
          <Link to="/galeria" className="text-white/90 hover:text-ibs-500 font-medium">Galería</Link>
          <Link to="/contacto" className="text-white/90 hover:text-ibs-500 font-medium">Contacto</Link>
          
          {/* Si el usuario está logueado, mostramos el menú de usuario, si no, los botones de acceso e inscripción */}
          {isLoggedIn ? (
            <UserMenu userName={userName} userAvatar={userAvatar} />
          ) : (
            <>
              <Button asChild variant="ghost" className="ml-2">
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Acceso
                </Link>
              </Button>
              <Button asChild className="bg-ibs-500 hover:bg-ibs-600 ml-2">
                <Link to="/inscribirse">
                  <Map className="h-4 w-4 mr-2" />
                  Inscríbete
                </Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {isLoggedIn && (
            <UserMenu userName={userName} userAvatar={userAvatar} />
          )}
          <button 
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col p-5 bg-black/95 border-t border-gray-800">
          <Link to="/" className="text-white py-3 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          <Link to="/nosotros" className="text-white py-3 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Quiénes Somos</Link>
          <Link to="/eventos" className="text-white py-3 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Eventos</Link>
          <Link to="/galeria" className="text-white py-3 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Galería</Link>
          <Link to="/contacto" className="text-white py-3 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
          
          {!isLoggedIn && (
            <div className="flex flex-col gap-2 mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4 mr-2" />
                  Acceso
                </Link>
              </Button>
              <Button asChild className="bg-ibs-500 hover:bg-ibs-600 w-full">
                <Link to="/inscribirse" onClick={() => setIsMenuOpen(false)}>
                  <Map className="h-4 w-4 mr-2" />
                  Inscríbete
                </Link>
              </Button>
            </div>
          )}
          
          {isLoggedIn && (
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/perfil" className="text-white py-3 border-b border-gray-800 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Link>
              <Link to="/mis-eventos" className="text-white py-3 border-b border-gray-800 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Calendar className="h-4 w-4 mr-2" />
                Mis eventos
              </Link>
              <Link to="/mensajes" className="text-white py-3 border-b border-gray-800 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensajes
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
