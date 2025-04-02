
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { CalendarCheck, MapPin, ArrowLeft, CheckCircle, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Mock data para las opciones de los accesorios
const accesoriosOptions = {
  "caja-rb": { label: "Caja portaroadbook", precio: 85 },
  "mando-bt": { label: "Mando Bluetooth", precio: 45 },
  "soporte": { label: "Soporte para GPS", precio: 30 },
  "guantes": { label: "Guantes técnicos", precio: 25 },
  "camiseta": { label: "Camiseta técnica extra", precio: 15 },
  "adhesivos": { label: "Pack de adhesivos", precio: 10 },
};

const opcionesAlojamiento = {
  "no-alojamiento": { label: "No necesito alojamiento", precio: 0 },
  "hotel-basic": { label: "Hotel (habitación básica)", precio: 65 },
  "hotel-premium": { label: "Hotel (habitación premium)", precio: 85 },
  "casa-rural": { label: "Casa rural (compartida)", precio: 55 },
};

const tiposRoadbook = {
  "digital": { label: "Digital", precio: 0 },
  "analógico de papel": { label: "Analógico de papel", precio: 0 },
  "no quiero roadbook": { label: "No quiero roadbook", precio: 0 },
};

// Precio base de la inscripción
const precioBaseInscripcion = 65;

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inscripcionData, setInscripcionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    // Recuperar datos del sessionStorage
    const storedData = sessionStorage.getItem("inscripcionData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setInscripcionData(parsedData);
      
      // Calcular el total
      calcularTotal(parsedData);
    } else {
      // Si no hay datos, redirigir a la página de inscripción
      navigate(`/inscribirse/${id}`);
    }
  }, [id, navigate]);

  const calcularTotal = (data: any) => {
    let totalCalculado = precioBaseInscripcion;

    // Añadir precio de accesorios seleccionados
    if (data.accesorios && data.accesorios.length > 0) {
      data.accesorios.forEach((accId: string) => {
        if (accesoriosOptions[accId as keyof typeof accesoriosOptions]) {
          totalCalculado += accesoriosOptions[accId as keyof typeof accesoriosOptions].precio;
        }
      });
    }

    // Añadir precio de alojamiento
    if (data.alojamiento && opcionesAlojamiento[data.alojamiento as keyof typeof opcionesAlojamiento]) {
      totalCalculado += opcionesAlojamiento[data.alojamiento as keyof typeof opcionesAlojamiento].precio;
    }

    // Añadir precio de cena grupal
    if (data.cenaGrupal) {
      totalCalculado += 25;
    }

    // Si lleva acompañante, añadir otro precio base
    if (data.llevaAcompanante) {
      totalCalculado += precioBaseInscripcion;
    }

    setTotal(totalCalculado);
  };

  const handleVolver = () => {
    navigate(`/inscribirse/${id}`);
  };

  const handlePago = () => {
    setIsLoading(true);
    
    // Simulamos el procesamiento del pago
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessDialog(true);
      
      // Limpiamos los datos del sessionStorage
      sessionStorage.removeItem("inscripcionData");
    }, 2000);
  };

  if (!inscripcionData) {
    return (
      <>
        <Navbar />
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando datos...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
        <div className="container max-w-4xl">
          {/* Cabecera del checkout */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleVolver}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la inscripción
            </Button>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Finalizar inscripción: {inscripcionData.evento.title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <CalendarCheck className="h-5 w-5 mr-2 text-aventura-500" />
                <span>{inscripcionData.evento.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-aventura-500" />
                <span>{inscripcionData.evento.location}</span>
              </div>
            </div>
          </div>

          {/* Resumen de la inscripción */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Resumen de tu inscripción</h2>
            
            <div className="space-y-6">
              {/* Datos del participante */}
              <div>
                <h3 className="text-md font-semibold mb-2">Datos del participante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Nombre completo</span>
                    <p>{inscripcionData.nombre} {inscripcionData.apellidos}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">DNI/NIE</span>
                    <p>{inscripcionData.dni}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p>{inscripcionData.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Teléfono</span>
                    <p>{inscripcionData.telefono}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Talla de camiseta</span>
                    <p>{inscripcionData.tallaCamiseta}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Datos de la moto */}
              <div>
                <h3 className="text-md font-semibold mb-2">Datos de la moto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Marca</span>
                    <p>{inscripcionData.marcaMoto}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Modelo</span>
                    <p>{inscripcionData.modeloMoto}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Tipo de moto</span>
                    <p className="capitalize">{inscripcionData.tipoMoto}</p>
                  </div>
                  {inscripcionData.motoclub && (
                    <div>
                      <span className="text-sm text-gray-500">Motoclub</span>
                      <p>{inscripcionData.motoclub}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Acompañante (si aplica) */}
              {inscripcionData.llevaAcompanante && inscripcionData.acompanante && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-md font-semibold mb-2">Datos del acompañante</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Nombre completo</span>
                        <p>{inscripcionData.acompanante.nombre} {inscripcionData.acompanante.apellidos}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">DNI/NIE</span>
                        <p>{inscripcionData.acompanante.dni}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Email</span>
                        <p>{inscripcionData.acompanante.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Teléfono</span>
                        <p>{inscripcionData.acompanante.telefono}</p>
                      </div>
                      {inscripcionData.acompanante.sexo && (
                        <div>
                          <span className="text-sm text-gray-500">Sexo</span>
                          <p className="capitalize">{inscripcionData.acompanante.sexo}</p>
                        </div>
                      )}
                      {inscripcionData.acompanante.tallaCamiseta && (
                        <div>
                          <span className="text-sm text-gray-500">Talla de camiseta</span>
                          <p>{inscripcionData.acompanante.tallaCamiseta}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              <Separator />
              
              {/* Tipo de roadbook */}
              <div>
                <h3 className="text-md font-semibold mb-2">Tipo de roadbook</h3>
                <p className="capitalize">
                  {tiposRoadbook[inscripcionData.tipoRoadbook as keyof typeof tiposRoadbook]?.label || inscripcionData.tipoRoadbook}
                </p>
              </div>
              
              {/* Accesorios y extras seleccionados */}
              {(inscripcionData.accesorios?.length > 0 || 
                inscripcionData.alojamiento !== "no-alojamiento" || 
                inscripcionData.cenaGrupal) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-md font-semibold mb-2">Accesorios y extras</h3>
                    <ul className="space-y-2">
                      {inscripcionData.accesorios?.map((accId: string) => (
                        <li key={accId} className="flex justify-between">
                          <span>{accesoriosOptions[accId as keyof typeof accesoriosOptions]?.label}</span>
                          <span className="font-semibold">{accesoriosOptions[accId as keyof typeof accesoriosOptions]?.precio} €</span>
                        </li>
                      ))}
                      
                      {inscripcionData.alojamiento !== "no-alojamiento" && (
                        <li className="flex justify-between">
                          <span>{opcionesAlojamiento[inscripcionData.alojamiento as keyof typeof opcionesAlojamiento]?.label}</span>
                          <span className="font-semibold">{opcionesAlojamiento[inscripcionData.alojamiento as keyof typeof opcionesAlojamiento]?.precio} €</span>
                        </li>
                      )}
                      
                      {inscripcionData.cenaGrupal && (
                        <li className="flex justify-between">
                          <span>Cena grupal (menú completo con bebida)</span>
                          <span className="font-semibold">25 €</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              )}
              
              {/* Comentarios (si aplica) */}
              {inscripcionData.comentarios && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-md font-semibold mb-2">Comentarios adicionales</h3>
                    <p className="text-gray-700 dark:text-gray-300">{inscripcionData.comentarios}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Resumen del pago */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Resumen del pago</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Inscripción principal</span>
                <span>{precioBaseInscripcion} €</span>
              </div>
              
              {inscripcionData.llevaAcompanante && (
                <div className="flex justify-between">
                  <span>Inscripción acompañante</span>
                  <span>{precioBaseInscripcion} €</span>
                </div>
              )}
              
              {inscripcionData.accesorios?.length > 0 && inscripcionData.accesorios.map((accId: string) => (
                <div key={accId} className="flex justify-between">
                  <span>{accesoriosOptions[accId as keyof typeof accesoriosOptions]?.label}</span>
                  <span>{accesoriosOptions[accId as keyof typeof accesoriosOptions]?.precio} €</span>
                </div>
              ))}
              
              {inscripcionData.alojamiento !== "no-alojamiento" && (
                <div className="flex justify-between">
                  <span>{opcionesAlojamiento[inscripcionData.alojamiento as keyof typeof opcionesAlojamiento]?.label}</span>
                  <span>{opcionesAlojamiento[inscripcionData.alojamiento as keyof typeof opcionesAlojamiento]?.precio} €</span>
                </div>
              )}
              
              {inscripcionData.cenaGrupal && (
                <div className="flex justify-between">
                  <span>Cena grupal</span>
                  <span>25 €</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-aventura-500">{total} €</span>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handlePago}
                  className="w-full bg-aventura-500 hover:bg-aventura-600"
                  disabled={isLoading}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {isLoading ? "Procesando pago..." : `Pagar ${total} €`}
                </Button>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                  Al hacer clic en "Pagar", serás redirigido a nuestra pasarela de pago segura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Diálogo de confirmación */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Inscripción completada con éxito
            </DialogTitle>
            <DialogDescription>
              Hemos recibido tu inscripción para el evento {inscripcionData.evento.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-400">
              Recibirás un correo electrónico con la confirmación y los detalles de tu inscripción. Si tienes alguna pregunta, no dudes en contactarnos.
            </p>
          </div>
          <DialogFooter>
            <Button 
              asChild
              className="w-full bg-aventura-500 hover:bg-aventura-600"
            >
              <Link to="/">
                Volver a la página principal
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
};

export default Checkout;
