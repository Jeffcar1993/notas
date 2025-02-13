"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HouseWifi, LogOut } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("El título y contenido no pueden estar vacíos.");
      return;
    }

  try {
    await addDoc(collection(db, "notas"), {
      title,
      content,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    alert("Nota guardada correctamente.");
    router.push("/notas"); // Redirige a la lista de notas
  } catch (error) {
    console.error("Error al guardar la nota:", error);
    alert("Error al guardar la nota.");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 mt-20">

        <div className="w-full fixed top-0 left-0 bg-white shadow-md p-4 flex justify-between items-center ">
            
            <Link href="/notas">
                <h1 className="ml-7 text-2xl font-bold text-blue-600 flex items-center gap-2">
                <HouseWifi /> Notes App 
                </h1>
            </Link>

            <Link className="mr-7 text-2xl font-bold text-blue-600 flex items-center gap-2" href="/">
                <LogOut /> Exit
            </Link>

        </div>

      <h2 className="text-2xl font-bold text-blue-600">Crear Nueva Nota</h2>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la nota"
        className="w-full max-w-md px-4 py-2 border rounded-lg mt-4"
      />
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu nota aquí..."
        className="w-full max-w-md h-40 px-4 py-2 border rounded-lg mt-4"
      />

      <div className="mt-4 flex gap-4">
        <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Guardar Nota
        </button>

        <button onClick={() => router.push("/notas")} className="px-6 py-2 bg-gray-400 text-white rounded-lg">
          Cancelar
        </button>
      </div>
    </div>
  );
}
