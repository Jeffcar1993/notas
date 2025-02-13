import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 📌 Nueva ruta en `src/data/notes.json`
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


// 🚀 **GET: Obtener todas las notas**
export async function GET() {
  try {
    const notes = getNotes();
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error("Error al leer notas:", error);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}

// 🚀 **POST: Guardar nueva nota**
export async function POST(req) {
  try {
    const { title, content } = await req.json();

    if (!title.trim() || !content.trim()) {
      return NextResponse.json({ message: "Campos vacíos" }, { status: 400 });
    }

    const notes = getNotes();

    const newNote = {
      id: Date.now(),
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    notes.push(newNote);
    fs.writeFileSync(filePath, JSON.stringify({ notes }, null, 2));

    return NextResponse.json({ message: "Nota guardada", note: newNote }, { status: 201 });

  } catch (error) {
    console.error("Error en API:", error);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
