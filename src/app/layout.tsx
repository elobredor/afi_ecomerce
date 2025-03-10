import "@/styles/globals.css";
import Providers from "@/providers/Providers";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer/footer";

export const metadata = {
  title: "Autofrio | Compra Online",
  description: "Encuentra los mejores productos con descuentos exclusivos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="font-titalium">
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <Providers>
          <Header />
          <main className="flex-grow p-0 sm:p-4 md:p-0 lg:p-0 xl:p-0 w-full max-w-7xl mx-auto mt-xl">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
