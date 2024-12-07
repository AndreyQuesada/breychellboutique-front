"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Heart, Search, ChevronDown, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "@/types";
import CartSidebar from "@/components/CartSidebar";
import WishlistSidebar from "@/components/WishlistSidebar";

const tiposAccesorios = ["Cartera", "Estuches", "Bolsos"];

const accesorios: Product[] = [
  {
    id: 1,
    nombre: "Cartera Elegante",
    precio: 49.99,
    imagenes: ["/img/cartera1.png", "/img/cartera1-2.png"],
    categoria: "Accesorios",
    descripcion: "Cartera elegante de cuero sintético, perfecta para ocasiones especiales.",
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Marrón", codigo: "#8B4513" },
    ],
    tipo: "Cartera",
  },
  {
    id: 2,
    nombre: "Estuche para Lentes",
    precio: 14.99,
    imagenes: ["/img/estuche1.png", "/img/estuche1-2.png"],
    categoria: "Accesorios",
    descripcion: "Estuche resistente para proteger tus lentes.",
    colores: [
      { nombre: "Azul", codigo: "#0000FF" },
      { nombre: "Rojo", codigo: "#FF0000" },
    ],
    tipo: "Estuches",
  },
  {
    id: 3,
    nombre: "Bolso Tote",
    precio: 39.99,
    imagenes: ["/img/bolso1.png", "/img/bolso1-2.png"],
    categoria: "Accesorios",
    descripcion: "Bolso tote espacioso y versátil para el día a día.",
    colores: [
      { nombre: "Beige", codigo: "#F5F5DC" },
      { nombre: "Negro", codigo: "#000000" },
    ],
    tipo: "Bolsos",
  },
  {
    id: 4,
    nombre: "Cartera de Mano",
    precio: 29.99,
    imagenes: ["/img/cartera2.png", "/img/cartera2-2.png"],
    categoria: "Accesorios",
    descripcion: "Cartera de mano compacta para salidas nocturnas.",
    colores: [
      { nombre: "Dorado", codigo: "#FFD700" },
      { nombre: "Plateado", codigo: "#C0C0C0" },
    ],
    tipo: "Cartera",
  },
  {
    id: 5,
    nombre: "Estuche para Maquillaje",
    precio: 19.99,
    imagenes: ["/img/estuche2.png", "/img/estuche2-2.png"],
    categoria: "Accesorios",
    descripcion: "Estuche espacioso para organizar tu maquillaje.",
    colores: [
      { nombre: "Rosa", codigo: "#FFC0CB" },
      { nombre: "Morado", codigo: "#800080" },
    ],
    tipo: "Estuches",
  },
  {
    id: 6,
    nombre: "Bolso Mochila",
    precio: 54.99,
    imagenes: ["/img/bolso2.png", "/img/bolso2-2.png"],
    categoria: "Accesorios",
    descripcion: "Bolso mochila moderno y funcional para uso diario.",
    colores: [
      { nombre: "Gris", codigo: "#808080" },
      { nombre: "Verde oliva", codigo: "#556B2F" },
    ],
    tipo: "Bolsos",
  },
  {
    id: 7,
    nombre: "Cartera Billetera",
    precio: 24.99,
    imagenes: ["/img/cartera3.png", "/img/cartera3-2.png"],
    categoria: "Accesorios",
    descripcion: "Cartera billetera con múltiples compartimentos para tarjetas y efectivo.",
    colores: [
      { nombre: "Marrón", codigo: "#8B4513" },
      { nombre: "Azul marino", codigo: "#000080" },
    ],
    tipo: "Cartera",
  },
  {
    id: 8,
    nombre: "Estuche para Joyas",
    precio: 34.99,
    imagenes: ["/img/estuche3.png", "/img/estuche3-2.png"],
    categoria: "Accesorios",
    descripcion: "Estuche elegante para guardar y organizar tus joyas.",
    colores: [
      { nombre: "Blanco", codigo: "#FFFFFF" },
      { nombre: "Negro", codigo: "#000000" },
    ],
    tipo: "Estuches",
  },
  {
    id: 9,
    nombre: "Bolso Crossbody",
    precio: 44.99,
    imagenes: ["/img/bolso3.png", "/img/bolso3-2.png"],
    categoria: "Accesorios",
    descripcion: "Bolso crossbody compacto y elegante para llevar lo esencial.",
    colores: [
      { nombre: "Rojo", codigo: "#FF0000" },
      { nombre: "Negro", codigo: "#000000" },
    ],
    tipo: "Bolsos",
  },
];

const ITEMS_PER_PAGE = 9;

export default function AccesoriosPage() {
  const [filtros, setFiltros] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(accesorios);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, totalCartAmount } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const resultados = accesorios.filter((accesorio) => {
      const cumpleFiltros = filtros.length === 0 || filtros.includes(accesorio.tipo);
      const cumpleBusqueda = accesorio.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return cumpleFiltros && cumpleBusqueda;
    });
    setProductosFiltrados(resultados);
    setCurrentPage(1);
  }, [filtros, busqueda]);

  const toggleFiltro = (tipo: string) => {
    setFiltros((prevFiltros) =>
      prevFiltros.includes(tipo)
        ? prevFiltros.filter((f) => f !== tipo)
        : [...prevFiltros, tipo]
    );
  };

  const totalPages = Math.ceil(productosFiltrados.length / ITEMS_PER_PAGE);
  const paginatedProducts = productosFiltrados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header
        categoriasDestacadas={["Pantalones", "Blusas", "Vestidos", "Accesorios"]}
        todasLasCategorias={["Pantalones", "Blusas", "Perfumería", "Enterizos", "Vestidos", "Accesorios", "Ropa interior"]}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
        setListaDeseosAbierta={setIsWishlistOpen}
        listaDeseosAbierta={isWishlistOpen}
        setCarritoAbierto={setIsCartOpen}
        carritoAbierto={isCartOpen}
        listaDeseos={wishlist}
        carrito={cart}
        setPaginaActual={() => {}}
        irACategoria={() => {}}
        setMenuAbierto={() => {}}
      />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">Accesorios</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar accesorios..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="p-2">
                    <h3 className="font-semibold mb-2">Tipo de accesorio</h3>
                    {tiposAccesorios.map((tipo) => (
                      <div key={tipo} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={tipo}
                          checked={filtros.includes(tipo)}
                          onCheckedChange={() => toggleFiltro(tipo)}
                        />
                        <Label htmlFor={tipo}>{tipo}</Label>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <AnimatePresence>
              {paginatedProducts.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 mt-8"
                >
                  No se encontraron productos que coincidan con tu búsqueda.
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginatedProducts.map((producto) => (
                    <motion.div
                      key={producto.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-80">
                            <Image
                              src={producto.imagenes[0]}
                              alt={producto.nombre}
                              layout="fill"
                              objectFit="cover"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2 bg-white"
                              onClick={() => {
                                if (isInWishlist(producto.id)) {
                                  removeFromWishlist(producto.id);
                                } else {
                                  addToWishlist(producto);
                                }
                              }}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  isInWishlist(producto.id) ? "fill-red-500 text-red-500" : ""
                                }`}
                              />
                              <span className="sr-only">
                                {isInWishlist(producto.id) ? 
                                  "Quitar de la lista de deseos" :
                                  "Agregar a la lista de deseos"
                                }
                              </span>
                            </Button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{producto.nombre}</h3>
                            <p className="text-gray-600 mb-4">${producto.precio.toFixed(2)}</p>
                            <Link 
                              href={{
                                pathname: `/producto/${producto.id}`,
                                query: { product: JSON.stringify(producto) },
                              }}
                              passHref
                            >
                              <Button className="w-full">
                                Ver detalles
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Ir a la página ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            totalCartAmount={totalCartAmount}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWishlistOpen && (
          <WishlistSidebar
            wishlist={wishlist}
            onClose={() => setIsWishlistOpen(false)}
            onRemoveFromWishlist={removeFromWishlist}
            onSelectProduct={(product) => {
              // Handle product selection if needed
              setIsWishlistOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}