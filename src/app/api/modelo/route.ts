import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    // 🔹 Obtener `idmarca` e `idcategoria` desde los parámetros de búsqueda
    const { searchParams } = new URL(req.url);
    const idmarca = searchParams.get("idmarca");
    const idcategoria = searchParams.get("idcategoria");

    if (!idmarca || !idcategoria) {
      return NextResponse.json(
        { error: "Debe proporcionar un ID de marca y un ID de categoría" },
        { status: 400 }
      );
    }

    // 🔹 Cargar el archivo modelo.json
    const filePath = path.join(process.cwd(), "src", "data", "modelo.json");

    // 🔥 Verificar que el archivo existe antes de leerlo
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Archivo modelo.json no encontrado" },
        { status: 404 }
      );
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const modelos = JSON.parse(jsonData);

    // 🔹 Filtrar los modelos según `idmarca` e `idcategoria`
    const modelosFiltrados = modelos.filter(
      (modelo: { idmarca: string; idcategoria: string }) =>
        modelo.idmarca.toString() === idmarca &&
        modelo.idcategoria.toString() === idcategoria
    );

    return NextResponse.json(modelosFiltrados, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API de modelos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
