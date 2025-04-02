
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface ImageGalleryProps {
  images: Image[];
  title?: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  const openLightbox = (image: Image) => {
    setCurrentImage(image);
    setOpen(true);
  };

  const nextImage = () => {
    if (!currentImage) return;
    const currentIndex = images.findIndex((img) => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const prevImage = () => {
    if (!currentImage) return;
    const currentIndex = images.findIndex((img) => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[prevIndex]);
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id}
            className="aspect-square cursor-pointer overflow-hidden rounded-md"
            onClick={() => openLightbox(image)}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl p-0 bg-black/90 border-none">
          <button 
            onClick={() => setOpen(false)} 
            className="absolute right-3 top-3 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="relative flex items-center justify-center h-[80vh]">
            {currentImage && (
              <img 
                src={currentImage.url} 
                alt={currentImage.alt} 
                className="max-h-full max-w-full"
              />
            )}
            
            <button 
              onClick={prevImage}
              className="absolute left-4 bg-black/30 rounded-full p-2 text-white hover:bg-black/50"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 bg-black/30 rounded-full p-2 text-white hover:bg-black/50"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
