
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Map } from "lucide-react";

interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const HeroSection = ({ 
  title, 
  description, 
  backgroundImage,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-[70vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            {description}
          </p>
          
          {(buttonText || secondaryButtonText) && (
            <div className="flex flex-wrap gap-4">
              {buttonText && buttonLink && (
                <Button asChild size="lg" className="bg-[#E25A24] hover:bg-[#C44A1B]">
                  <Link to={buttonLink}>
                    <Calendar className="mr-2 h-5 w-5" />
                    {buttonText}
                  </Link>
                </Button>
              )}
              
              {secondaryButtonText && secondaryButtonLink && (
                <Button asChild size="lg" className="bg-[#E25A24] hover:bg-[#C44A1B]">
                  <Link to={secondaryButtonLink}>
                    <Map className="mr-2 h-5 w-5" />
                    {secondaryButtonText}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

