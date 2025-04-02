
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserMenuProps {
  userName: string;
  userAvatar?: string;
}

const UserMenu = ({ userName, userAvatar }: UserMenuProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Obtener iniciales para el avatar
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-aventura-500">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-aventura-100 text-aventura-800">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/perfil" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/mis-eventos" className="cursor-pointer flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Mis eventos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/mensajes" className="cursor-pointer flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Mensajes</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-red-500 focus:text-red-500 flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
