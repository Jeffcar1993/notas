import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 📌 Ruta al archivo JSON donde están almacenadas las notas
const filePath = path.join(process.cwd(), "src", "data", "notes.json");

// 📌 Función para leer las notas desde el archivo
function getNotes() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data).notes || [];
  } catch (error) {
    console.error("Error al leer el archivo de notas:", error);
    return [];
  }
}

// 📌 Función GET para obtener una nota por ID
export async function GET(req, { params }) {
  const { id } = params; // Obtenemos el ID desde los parámetros de la URL

  if (!id) {
    return NextResponse.json({ message: "ID no proporcionado" }, { status: 400 });
  }

  const notes = getNotes();
  const note = notes.find((n) => n.id === Number(id)); // Convertir id a número

  if (!note) {
    return NextResponse.json({ message: "Nota no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ note }, { status: 200 });
}

// 📌 Función DELETE corregida
export async function DELETE(req, context) {
  const { params } = context;
  const { id } = params;

  try {
    console.log(`🗑️ Intentando eliminar la nota con ID: ${id}`);

    if (!id) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    // Leer archivo JSON
    const fileContent = await fs.promises.readFile(filePath, "utf-8"); // ✅ Usamos fs.promises.readFile
    let notes = JSON.parse(fileContent).notes;
    
    // Buscar y eliminar la nota
    const noteIndex = notes.findIndex((note) => note.id === Number(id));
    if (noteIndex === -1) {
      return NextResponse.json({ error: "Nota no encontrada" }, { status: 404 });
    }
    notes.splice(noteIndex, 1);

    // Guardar el archivo actualizado
    await fs.promises.writeFile(filePath, JSON.stringify({ notes }, null, 2), "utf-8"); // ✅ Usamos fs.promises.writeFile
    console.log("✅ Nota eliminada correctamente");

    return NextResponse.json({ message: "Nota eliminada correctamente" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error interno del servidor:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PATCH(req, context) {
  const { id } = context.params;
  
  try {
    console.log(`✏️ Actualizando nota con ID: ${id}`);

    const body = await req.json();
    const { title, content } = body;

    // Leer las notas actuales
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    let notes = JSON.parse(fileContent).notes;

    // Buscar la nota por ID
    const noteIndex = notes.findIndex((note) => note.id === Number(id));
    if (noteIndex === -1) {
      return NextResponse.json({ error: "Nota no encontrada" }, { status: 404 });
    }

    // Actualizar los valores de la nota
    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title || notes[noteIndex].title,
      content: content || notes[noteIndex].content,
      updated_at: new Date().toISOString(), // Actualizamos `updated_at`
    };

    // Guardar cambios en el archivo
    await fs.promises.writeFile(filePath, JSON.stringify({ notes }, null, 2), "utf-8");

    console.log("✅ Nota actualizada correctamente");
    return NextResponse.json({ message: "Nota actualizada correctamente", note: notes[noteIndex] }, { status: 200 });

  } catch (error) {
    console.error("❌ Error al actualizar la nota:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

