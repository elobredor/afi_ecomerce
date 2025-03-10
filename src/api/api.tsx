import fs from "fs";
import path from "path";

export const getProductos = () => {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "productos.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error al leer el archivo de productos:", error);
    return [];
  }
  
};
export const getCatalogo = () => {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "catalogo.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error al leer el archivo de productos:", error);
    return [];
  }
  
};



export const getMarcas = (idcategoria: string) => {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "marcas.json");

    // 🔥 Verifica si el archivo existe antes de leerlo
    if (!fs.existsSync(filePath)) {
      console.error("Error: Archivo marcas.json no encontrado");
      return [];
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const marcas = JSON.parse(jsonData);

    // 🔹 Filtra las marcas según `idcategoria`
    const marcasFiltradas = marcas.filter((marca: { idcategoria: string }) => marca.idcategoria.toString() === idcategoria);

    return marcasFiltradas;
  } catch (error) {
    console.error("Error al leer el archivo de marcas:", error);
    return [];
  }
};


