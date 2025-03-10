# eCommerce con Next.js, Redux y API Externa

Este es un proyecto de eCommerce desarrollado con **Next.js**, que consume una API externa para la gestión de productos. Utiliza **Redux Toolkit** para el manejo del estado y **Axios** para las peticiones HTTP.

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```sh
git clone https://github.com/tu-usuario/ecommerce-next.git
cd ecommerce-next
```

### 2. Instalar dependencias
```sh
npm install
```

### 3. Configurar las variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 4. Ejecutar el proyecto en desarrollo
```sh
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

---

## 📦 Tecnologías Utilizadas
- **Next.js**: Framework de React para SSR y SSG
- **TypeScript**: Tipado estático
- **TailwindCSS**: Estilización
- **Redux Toolkit**: Manejo de estado
- **Axios**: Consumo de API

---

## 📄 Estructura del Proyecto
```
├── src/
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Páginas principales
│   │   ├── index.tsx       # Página principal
│   │   ├── cart.tsx        # Carrito de compras
│   ├── store/              # Redux Toolkit
│   │   ├── slices/         # Slices de Redux (productos, carrito)
│   │   ├── store.ts        # Configuración del store
│   ├── styles/             # Estilos globales
│   ├── utils/              # Funciones de utilidad
│
├── .env.local              # Variables de entorno
├── package.json            # Dependencias del proyecto
├── README.md               # Documentación del proyecto
```

---

## 🛒 Funcionalidades
✅ Mostrar productos desde la API externa
✅ Agregar y eliminar productos del carrito con Redux
✅ Página de carrito con listado de productos seleccionados
✅ Manejo de estado global con Redux Toolkit
✅ Estilos modernos con TailwindCSS

---

## 📌 Próximos pasos
🔹 Integrar autenticación con **NextAuth**
🔹 Implementar una pasarela de pagos (**Stripe o MercadoPago**)
🔹 Crear página de detalles del producto

---

## 🤝 Contribuir
Si deseas contribuir, haz un **fork** del proyecto, crea una nueva rama y envía un **pull request**.

```sh
git checkout -b feature/nueva-funcionalidad
git commit -m "Agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

---

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**. Puedes usarlo libremente para proyectos comerciales o personales.

