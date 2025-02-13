
"use client";

import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HouseWifi, LogOut, Pencil, Trash2 } from "lucide-react";

export default function NotaPage() {
  const { id } = useParams(); // Obtener el ID correctamente
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        const docRef = doc(db, "notas", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNote(docSnap.data());
        } else {
          router.push("/notas"); // Redirige si la nota no existe
        }
      } catch (error) {
        console.error("Error cargando la nota:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "notas", id));
      router.push("/notas"); // Redirige después de eliminar
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  if (loading) {
    return (
    <div className="flex justify-center mt-20">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    );
  }

  if (!note) return <p className="text-center mt-20">Nota no encontrada</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 mt-20">

      <div className="w-full fixed top-0 left-0 bg-white shadow-md p-4 flex justify-between items-center">
        <Link href="/notas">
          <h1 className="ml-7 text-2xl font-bold text-blue-600 flex items-center gap-2">
            <HouseWifi /> Notes App
          </h1>
        </Link>
        <Link className="mr-7 text-2xl font-bold text-blue-600 flex items-center gap-2" href="/">
          <LogOut /> Exit
        </Link>
      </div>


      <div className="bg-white shadow p-6 mb-4 rounded-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{note.title}</h1>
        <p className="text-gray-600 leading-relaxed">{note.content}</p>


        <div className="flex flex-col gap-1 mt-3">
          <p className="text-gray-500 text-xs font-mono">
            Creado: {note.created_at?.toDate().toLocaleString("es-ES")}
          </p>
          <p className="text-blue-500 text-xs font-mono">
            Editado: {note.updated_at?.toDate().toLocaleString("es-ES")}
          </p>
        </div>

        <div className="flex justify-around gap-4 mt-5">
          <Link href={`/notas/edit/${id}`}>
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
              <Pencil size={16} /> Editar
            </button>
          </Link>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>

      <Link href="/notas">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-md">
          Ver todas las notas
        </button>
      </Link>
    </div>
  );
}
