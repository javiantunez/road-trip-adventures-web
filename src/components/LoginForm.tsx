
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This is just a mock authentication for demonstration
    // In a real app, you would validate against a backend
    setTimeout(() => {
      if (formData.email === "admin@example.com" && formData.password === "admin") {
        // Admin user
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userEmail", formData.email);
        toast({
          title: "Sesión iniciada",
          description: "Has iniciado sesión como administrador.",
        });
        navigate("/panel/admin");
      } else if (formData.email === "user@example.com" && formData.password === "user") {
        // Regular user
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userEmail", formData.email);
        toast({
          title: "Sesión iniciada",
          description: "Has iniciado sesión correctamente.",
        });
        navigate("/panel/usuario");
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Correo electrónico o contraseña incorrectos.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Correo electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
          autoComplete="email"
        />
        <p className="text-xs text-gray-500">
          Demo admin: admin@example.com / admin
        </p>
        <p className="text-xs text-gray-500">
          Demo usuario: user@example.com / user
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <a href="#" className="text-sm text-aventura-600 hover:text-aventura-500">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Tu contraseña"
          required
          autoComplete="current-password"
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-aventura-500 hover:bg-aventura-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes una cuenta?{" "}
          <a href="/registro" className="text-aventura-600 hover:text-aventura-500 font-medium">
            Registrarse
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
