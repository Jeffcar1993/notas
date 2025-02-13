"use client";

import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HouseWifi, LogOut, Save, XCircle } from "lucide-react";

export default function EditarNota() {
  const { id } = useParams();
  const router = useRouter();
  const [note, setNote] = useState({ title: "", content: "" });
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
          router.push("/notas");
        }
      } catch (error) {
        console.error("Error cargando la nota:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, router]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "notas", id);
      await updateDoc(docRef, { ...note, updated_at: new Date() });
      router.push("/notas");
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
    } 
  };

  if (loading) {
    return (
    <div className="flex justify-center mt-20">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    );
  }

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


      <div className="bg-white shadow-lg rounded-lg p-6 mt-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Editar Nota</h1>

        <input
          className="border border-gray-300 rounded p-3 w-full text-lg focus:ring-2 focus:ring-blue-500"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="Título"
        />
        <textarea
          className="border border-gray-300 rounded p-3 w-full mt-4 text-lg focus:ring-2 focus:ring-blue-500"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          placeholder="Contenido"
          rows="5"
        />

        <div className="flex justify-between mt-6">

        <button
            onClick={handleUpdate}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
          >
            <Save size={18} /> Guardar Cambios
          </button>

          <button
            onClick={() => router.push(`/notas/${id}`)}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            <XCircle size={18} /> Cancelar
          </button>
          
        </div>
      </div>


      <Link href="/notas">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-md mt-8">
          Ver todas las notas
        </button>
      </Link>
    </div>
  );
}
