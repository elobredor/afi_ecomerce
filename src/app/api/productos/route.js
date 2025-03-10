import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // 🔥 Carga el archivo productos.json
    const filePath = path.join(process.cwd(), "src", "data", "productos.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Error al leer el archivo de productos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
