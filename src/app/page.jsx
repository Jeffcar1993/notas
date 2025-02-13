"use client"; // Importante para usar hooks en Next.js App Router

import { useRouter } from "next/navigation";

export default function HomePage() {
  
  const router = useRouter(); // Hook para navegar

  const handleLogin = () => {
    // Redirigir a la página
    router.push(`/notas`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-9 text-center">
        Bienvenido a Notes App
      </h1>

      <h2 className="text-xl font-normal text-black mb-9 text-center">Gestiona tus notas y recuerda lo que debes realizar dia a dia</h2>

      <button
        onClick={handleLogin}
        className="w-full max-w-xs mt-7 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md text-center hover:bg-blue-700 transition duration-300"
      >
        Ingresar
      </button>
    </div>
  );
}
