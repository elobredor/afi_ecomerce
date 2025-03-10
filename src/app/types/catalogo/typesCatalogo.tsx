interface CardProps {
  imageSrc: string;
  text: string;
  id: any;
  categoria?: string;
  marca?: string;
  modelo?: string;
  producto?: string;
  level: "categoria" | "marca" | "linea" | "producto"; // 🔥 Nuevo parámetro para identificar el nivel
}
