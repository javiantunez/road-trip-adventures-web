
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MapPin } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  isPast?: boolean;
}

const EventCard = ({ id, title, date, location, image, isPast = false }: EventCardProps) => {
  return (
    <div className="event-card bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md group">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isPast && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold px-3 py-1 bg-aventura-800/80 rounded-full text-sm">
              Evento finalizado
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
          <CalendarCheck className="h-4 w-4 mr-2 text-aventura-500" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
          <MapPin className="h-4 w-4 mr-2 text-aventura-500" />
          <span>{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to={`/eventos/${id}`}>
              Ver detalles
            </Link>
          </Button>
          {!isPast && (
            <Button asChild>
              <Link to={`/inscribirse/${id}`} className="bg-aventura-500 hover:bg-aventura-600">
                Inscríbete
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
