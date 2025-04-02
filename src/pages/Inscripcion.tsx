
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CalendarCheck, MapPin, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

// Esquema de validación para el formulario de inscripción
const inscripcionSchema = z.object({
  // Datos del participante
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellidos: z.string().min(2, "Los apellidos son obligatorios"),
  dni: z.string().min(9, "DNI inválido"),
  telefono: z.string().min(9, "Teléfono inválido"),
  email: z.string().email("Email inválido"),
  tallaCamiseta: z.string().min(1, "Selecciona una talla"),
  
  // Datos de la moto
  marcaMoto: z.string().min(1, "La marca es obligatoria"),
  modeloMoto: z.string().min(1, "El modelo es obligatorio"),
  tipoMoto: z.string().min(1, "Selecciona un tipo de moto"),
  motoclub: z.string().optional(),
  
  // Acompañante
  llevaAcompanante: z.boolean().default(false),
  acompanante: z.object({
    nombre: z.string().optional(),
    apellidos: z.string().optional(),
    dni: z.string().optional(),
    telefono: z.string().optional(),
    email: z.string().optional(),
    sexo: z.string().optional(),
    tallaCamiseta: z.string().optional(),
  }).optional(),
  
  // Tipo de roadbook
  tipoRoadbook: z.string().min(1, "Selecciona un tipo de roadbook"),
  
  // Accesorios y extras
  accesorios: z.array(z.string()).optional(),
  alojamiento: z.string().optional(),
  cenaGrupal: z.boolean().default(false),
  
  // Comentarios adicionales
  comentarios: z.string().optional(),
}).refine(
  (data) => {
    if (data.llevaAcompanante) {
      return (
        !!data.acompanante?.nombre &&
        !!data.acompanante?.apellidos &&
        !!data.acompanante?.dni &&
        !!data.acompanante?.telefono &&
        !!data.acompanante?.email
      );
    }
    return true;
  },
  {
    message: "Los datos del acompañante son obligatorios",
    path: ["acompanante"],
  }
);

// Mock data del evento
const eventData = {
  "cantabria-challenge-2023": {
    id: "cantabria-challenge-2023",
    title: "III Cantabria Challenge",
    date: "11-12 Abril, 2023",
    location: "Hoznayo, Cantabria",
    heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  }
};

// Mock data para las opciones de los selects
const tallasOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const tiposMotoOptions = ["Trail", "Adventure", "Enduro", "Custom", "Deportiva", "Naked", "Scooter", "Otro"];
const tiposRoadbookOptions = ["Digital", "Analógico de papel", "No quiero roadbook"];
const accesoriosOptions = [
  { id: "caja-rb", label: "Caja portaroadbook", precio: 85 },
  { id: "mando-bt", label: "Mando Bluetooth", precio: 45 },
  { id: "soporte", label: "Soporte para GPS", precio: 30 },
  { id: "guantes", label: "Guantes técnicos", precio: 25 },
  { id: "camiseta", label: "Camiseta técnica extra", precio: 15 },
  { id: "adhesivos", label: "Pack de adhesivos", precio: 10 },
];
const opcionesAlojamiento = [
  { id: "no-alojamiento", label: "No necesito alojamiento", precio: 0 },
  { id: "hotel-basic", label: "Hotel (habitación básica)", precio: 65 },
  { id: "hotel-premium", label: "Hotel (habitación premium)", precio: 85 },
  { id: "casa-rural", label: "Casa rural (compartida)", precio: 55 },
];

const Inscripcion = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Obtener datos del evento
  const event = id ? eventData[id as keyof typeof eventData] : null;

  const form = useForm<z.infer<typeof inscripcionSchema>>({
    resolver: zodResolver(inscripcionSchema),
    defaultValues: {
      nombre: "",
      apellidos: "",
      dni: "",
      telefono: "",
      email: "",
      tallaCamiseta: "",
      marcaMoto: "",
      modeloMoto: "",
      tipoMoto: "",
      motoclub: "",
      llevaAcompanante: false,
      acompanante: {
        nombre: "",
        apellidos: "",
        dni: "",
        telefono: "",
        email: "",
        sexo: "",
        tallaCamiseta: "",
      },
      tipoRoadbook: "",
      accesorios: [],
      alojamiento: "no-alojamiento",
      cenaGrupal: false,
      comentarios: "",
    },
  });

  const llevaAcompanante = form.watch("llevaAcompanante");

  const onSubmit = async (values: z.infer<typeof inscripcionSchema>) => {
    setIsLoading(true);
    try {
      // Simulamos el envío de datos (aquí se conectaría con la API real)
      console.log("Datos de inscripción:", values);
      
      // Agregamos el evento a los datos para el checkout
      const checkoutData = {
        ...values,
        evento: event,
      };
      
      // Guardamos los datos en sessionStorage para recuperarlos en el checkout
      sessionStorage.setItem("inscripcionData", JSON.stringify(checkoutData));
      
      // Redirigimos al checkout
      navigate(`/checkout/${id}`);
    } catch (error) {
      console.error("Error al procesar la inscripción:", error);
      toast.error("Error al procesar la inscripción", {
        description: "Por favor, inténtalo de nuevo más tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <a href="/eventos">Volver a eventos</a>
          </Button>
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
          {/* Cabecera del evento */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Inscripción: {event.title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <CalendarCheck className="h-5 w-5 mr-2 text-aventura-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-aventura-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-aventura-500" />
                <span>200 plazas disponibles</span>
              </div>
            </div>
          </div>

          {/* Formulario de inscripción */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Sección: Datos del participante */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Datos del participante</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="apellidos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellidos</FormLabel>
                          <FormControl>
                            <Input placeholder="Tus apellidos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dni"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DNI/NIE</FormLabel>
                          <FormControl>
                            <Input placeholder="12345678A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="tu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tallaCamiseta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Talla de camiseta</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una talla" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tallasOptions.map((talla) => (
                                <SelectItem key={talla} value={talla}>
                                  {talla}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Sección: Datos de la moto */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Datos de la moto</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="marcaMoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca</FormLabel>
                          <FormControl>
                            <Input placeholder="BMW, Honda, Yamaha..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="modeloMoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modelo</FormLabel>
                          <FormControl>
                            <Input placeholder="GS 1250, Africa Twin..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tipoMoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de moto</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tiposMotoOptions.map((tipo) => (
                                <SelectItem key={tipo} value={tipo.toLowerCase()}>
                                  {tipo}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="motoclub"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motoclub (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre del motoclub" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Sección: Acompañante */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Acompañante</h2>
                    <FormField
                      control={form.control}
                      name="llevaAcompanante"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Llevo acompañante
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {llevaAcompanante && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name="acompanante.nombre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del acompañante</FormLabel>
                            <FormControl>
                              <Input placeholder="Nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acompanante.apellidos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apellidos del acompañante</FormLabel>
                            <FormControl>
                              <Input placeholder="Apellidos" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acompanante.dni"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>DNI/NIE del acompañante</FormLabel>
                            <FormControl>
                              <Input placeholder="12345678A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acompanante.telefono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono del acompañante</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acompanante.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email del acompañante</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="acompanante@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acompanante.sexo"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Sexo del acompañante</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="masculino" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Masculino
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="femenino" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Femenino
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acompanante.tallaCamiseta"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Talla de camiseta del acompañante</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona una talla" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {tallasOptions.map((talla) => (
                                  <SelectItem key={talla} value={talla}>
                                    {talla}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                
                <Separator />
                
                {/* Sección: Tipo de roadbook */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Tipo de roadbook</h2>
                  <FormField
                    control={form.control}
                    name="tipoRoadbook"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {tiposRoadbookOptions.map((tipo) => (
                              <FormItem key={tipo} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={tipo.toLowerCase()} />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {tipo}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                {/* Sección: Accesorios y extras */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Accesorios y extras</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-semibold mb-2">Accesorios opcionales</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="accesorios"
                          render={() => (
                            <FormItem>
                              {accesoriosOptions.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="accesorios"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 mb-3"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="font-normal flex justify-between cursor-pointer">
                                            <span>{item.label}</span>
                                            <span className="font-semibold text-aventura-500 ml-4">{item.precio} €</span>
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-semibold mb-2">Alojamiento</h3>
                      <FormField
                        control={form.control}
                        name="alojamiento"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {opcionesAlojamiento.map((opcion) => (
                                  <FormItem key={opcion.id} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={opcion.id} />
                                    </FormControl>
                                    <FormLabel className="font-normal flex justify-between w-full cursor-pointer">
                                      <span>{opcion.label}</span>
                                      <span className="font-semibold text-aventura-500">{opcion.precio > 0 ? `${opcion.precio} €` : '--'}</span>
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormField
                        control={form.control}
                        name="cenaGrupal"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal flex justify-between cursor-pointer">
                                <span>Cena grupal (menú completo con bebida)</span>
                                <span className="font-semibold text-aventura-500 ml-4">25 €</span>
                              </FormLabel>
                              <FormDescription>
                                Disfruta de una cena con todos los participantes
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Sección: Comentarios adicionales */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Comentarios adicionales</h2>
                  <FormField
                    control={form.control}
                    name="comentarios"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Si tienes alguna información adicional que quieras compartir, escríbela aquí" 
                            className="h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Botones de acción */}
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-aventura-500 hover:bg-aventura-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Procesando..." : "Continuar al checkout"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Inscripcion;
