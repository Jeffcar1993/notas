"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";


export default function NotasPage() {
  
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notas"));
        const notesList = querySnapshot.docs.map(doc => ({
          
          id: doc.id,  // ID aleatorio del documento
          ...doc.data(), // Extrae los campos (title, content, created_at, etc.)
        }))
        
        setNotes(notesList);
      } catch (error) {
        console.error("Error al obtener las notas:", error);
        setNotes([]); // En caso de error, evita que notes sea undefined
      }
    };
  
    fetchNotes();
  }, []);

  useEffect(() => {
    // Filtrar notas cuando cambia el término de búsqueda o las notas
    const filterNotes = () => {
      if (!searchTerm) {
        setFilteredNotes(notes); // Mostrar todas las notas si no hay término de búsqueda
        return;
      }

      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = notes.filter((note) => {
        // Busca en el título y el contenido de la nota
        const titleMatch = note.title.toLowerCase().includes(lowerCaseSearchTerm);
        const contentMatch = note.content.toLowerCase().includes(lowerCaseSearchTerm);
        return titleMatch || contentMatch; // Devuelve true si encuentra coincidencia en el título o contenido
      });
      setFilteredNotes(filtered);
    };

    filterNotes();
  }, [searchTerm, notes]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">

       <div className="w-full fixed top-0 left-0 bg-white shadow-md p-4 flex justify-between items-center z-50">

            <h1 className="ml-7 text-2xl font-bold text-blue-600">
            Bienvenido a Notes App 
            </h1>

            <Link className="mr-7 text-2xl font-bold text-blue-600" href="/">
                Exit
            </Link>

        </div>

        <div className="w-full flex flex-col items-center mt-20">

            <h2 className="text-2xl font-bold text-blue-600">
                Estas son tus notas
            </h2>

            <input
                type="text"
                placeholder="busca una nota"
                value={searchTerm} // Enlaza el valor del input con el estado searchTerm
                onChange={handleSearchChange} // Llama a handleSearchChange al cambiar el input
                className="border border-gray-300 rounded-3xl px-3 py-2 mt-4 w-full sm:w-1/2" // Estilos para el input
              />

              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 mb-24">
            {filteredNotes.map((note) => (

              <Link href={`/notas/${note.id}`} key={note.id} className="bg-white shadow p-4 mb-2 rounded-md">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-700">{note.content}</p>

                <div className="flex flex-col gap-1 mt-3">
                  <p className="text-gray-500 text-xs font-mono">
                    Creado: {note.created_at?.toDate().toLocaleString("es-ES")}
                  </p>
                  <p className="text-blue-500 text-xs font-mono">
                    Editado: {note.updated_at?.toDate().toLocaleString("es-ES")}
                  </p>
                </div>
              </Link>
              ))}

              </ul>

            <Link href="/notas/note/new">
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
                Crear Nueva Nota
              </button>
            </Link>

        </div>
    </div>
  );
}
