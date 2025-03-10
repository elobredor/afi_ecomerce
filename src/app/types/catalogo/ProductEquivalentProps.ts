export interface ProductEquivalentProps {
    id: number;
    imageSrc: string; // Imagen principal del producto
    modelo: string;
    marca: string;
    nombre: string;
    repuestos: {
      nombre: string;
      logo: string;
      codigo: string;
    }[];
  }
  