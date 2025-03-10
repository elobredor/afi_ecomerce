import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  debugger
  // Verifica si el usuario tiene una sesión activa
  const isAuthenticated = req.cookies.get("token"); // Ajusta según tu lógica de autenticación
  // Rutas que requieren autenticación
  if (req.nextUrl.pathname.startsWith("/portal") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirige a login si no está autenticado
  }

  return NextResponse.next();
}

// Define en qué rutas se ejecuta el middleware
export const config = {
  matcher: ["/portal/:path*", "/cart"], // Protege ambas rutas
};
