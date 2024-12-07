import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  categoriasDestacadas: string[];
  todasLasCategorias: string[];
  setBusqueda: (busqueda: string) => void;
  busqueda: string;
  setListaDeseosAbierta: (isOpen: boolean) => void;
  listaDeseosAbierta: boolean;
  setCarritoAbierto: (isOpen: boolean) => void;
  carritoAbierto: boolean;
  listaDeseos: any[];
  carrito: any[];
  setPaginaActual: (pagina: string) => void;
  irACategoria: (categoria: string) => void;
  setMenuAbierto: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  categoriasDestacadas,
  todasLasCategorias,
  setBusqueda,
  busqueda,
  setListaDeseosAbierta,
  listaDeseosAbierta,
  setCarritoAbierto,
  carritoAbierto,
  listaDeseos,
  carrito,
  setPaginaActual,
  irACategoria,
  setMenuAbierto
}) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md p-4 sticky top-0 z-10"
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Categorías</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {todasLasCategorias.map((categoria) => (
                  <Button
                    key={categoria}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      irACategoria(categoria);
                      setMenuAbierto(false);
                    }}
                  >
                    {categoria}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" onClick={() => setPaginaActual("inicio")}>
            <Image
              src="/img/logo3.png"
              alt="Breychell Boutique Logo"
              width={80}
              height={80}
              className="mr-4"
            />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          {["Novedades", ...categoriasDestacadas, "Ofertas"].map((item) => (
            <Link
              key={item}
              href={`/categoria/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setPaginaActual(item.toLowerCase())}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-8"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setListaDeseosAbierta(!listaDeseosAbierta)}
            className="relative"
          >
            <Heart className="h-6 w-6" />
            {listaDeseos.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {listaDeseos.length}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCarritoAbierto(!carritoAbierto)}
            className="relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {carrito.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {carrito.reduce((total, item) => total + item.cantidad, 0)}
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;