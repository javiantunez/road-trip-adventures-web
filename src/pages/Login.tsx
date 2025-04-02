
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-20">
        <div className="container max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Iniciar sesión</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Bienvenido de nuevo a MotoAventura
              </p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
