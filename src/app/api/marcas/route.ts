import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    // 🔹 Obtener `idcategoria` desde los parámetros de búsqueda
    const { searchParams } = new URL(req.url);
    const idcategoria = searchParams.get("idcategoria");

    if (!idcategoria) {
      return NextResponse.json({ error: "Debe proporcionar un ID de categoría" }, { status: 400 });
    }

    // 🔹 Cargar el archivo marcas.json
    const filePath = path.join(process.cwd(), "src", "data", "marcas.json");

    // 🔥 Verificar que el archivo existe antes de leerlo
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Archivo marcas.json no encontrado" }, { status: 404 });
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const marcas = JSON.parse(jsonData);

    // 🔹 Filtrar las marcas según `idcategoria`
    const marcasFiltradas = marcas.filter((marca: { idcategoria: string }) => marca.idcategoria.toString() === idcategoria);

    return NextResponse.json(marcasFiltradas, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API de marcas:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
