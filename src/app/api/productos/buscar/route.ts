import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  console.log('req');
  
  try {
    
    // 🔹 Obtener el parámetro `search` correctamente en Next.js con TypeScript
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    // 🔹 Cargar el archivo `productos.json`
    const filePath = path.join(process.cwd(), "src", "data", "productos.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const productos: any[] = JSON.parse(jsonData);

    // 🔹 Si `search` está vacío, devolver una lista vacía
    if (!search.trim()) {
      return NextResponse.json([], { status: 200 });
    }

    // 🔹 Convertir `search` a minúsculas para comparación insensible a mayúsculas/minúsculas
    const searchLower = search.toLowerCase();

    // 🔹 Filtrar productos basados en `text`, `descripcion`, `categoria` y `aplications`
    const filteredProductos = productos.filter((producto) =>
      producto.text.toLowerCase().includes(searchLower) ||
      producto.text.toLowerCase().includes(searchLower) ||
      producto.categoria.toLowerCase().includes(searchLower) ||
      (producto.aplications &&
        Array.isArray(producto.aplications) &&
        producto.aplications.some((aplicacion: string) =>
          aplicacion.toLowerCase().includes(searchLower)
        ))
    );

    return NextResponse.json(filteredProductos, { status: 200 });
  } catch (error) {
    console.error("❌ Error al filtrar los productos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
