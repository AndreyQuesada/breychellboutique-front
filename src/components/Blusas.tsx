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

const tiposBlusas = ["Cortas", "De vestir", "Básicas", "Casuales"];

const blusas: Product[] = [
  {
    id: 1,
    nombre: "Blusa Casual Floral",
    precio: 29.99,
    imagenes: ["/img/blusa1.png", "/img/blusa1-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa casual con estampado floral, perfecta para el día a día.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Blanco", codigo: "#FFFFFF" },
      { nombre: "Azul claro", codigo: "#ADD8E6" },
    ],
    tipo: "Casuales",
  },
  {
    id: 2,
    nombre: "Blusa de Vestir Elegante",
    precio: 39.99,
    imagenes: ["/img/blusa2.png", "/img/blusa2-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa elegante para ocasiones formales o de trabajo.",
    tallas: ["S", "M", "L"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Blanco", codigo: "#FFFFFF" },
    ],
    tipo: "De vestir",
  },
  {
    id: 3,
    nombre: "Blusa Básica de Algodón",
    precio: 19.99,
    imagenes: ["/img/blusa3.png", "/img/blusa3-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa básica de algodón, cómoda y versátil.",
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: [
      { nombre: "Blanco", codigo: "#FFFFFF" },
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Gris", codigo: "#808080" },
    ],
    tipo: "Básicas",
  },
  {
    id: 4,
    nombre: "Blusa Corta de Verano",
    precio: 24.99,
    imagenes: ["/img/blusa4.png", "/img/blusa4-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa corta ideal para el verano, fresca y a la moda.",
    tallas: ["S", "M", "L"],
    colores: [
      { nombre: "Amarillo", codigo: "#FFFF00" },
      { nombre: "Rosa", codigo: "#FFC0CB" },
    ],
    tipo: "Cortas",
  },
  {
    id: 5,
    nombre: "Blusa Formal con Lazo",
    precio: 34.99,
    imagenes: ["/img/blusa5.png", "/img/blusa5-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa formal con lazo en el cuello, perfecta para la oficina.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Blanco", codigo: "#FFFFFF" },
      { nombre: "Azul marino", codigo: "#000080" },
    ],
    tipo: "De vestir",
  },
  {
    id: 6,
    nombre: "Blusa Casual de Manga Larga",
    precio: 27.99,
    imagenes: ["/img/blusa6.png", "/img/blusa6-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa casual de manga larga, cómoda y estilizada.",
    tallas: ["S", "M", "L"],
    colores: [
      { nombre: "Beige", codigo: "#F5F5DC" },
      { nombre: "Verde oliva", codigo: "#808000" },
    ],
    tipo: "Casuales",
  },
  {
    id: 7,
    nombre: "Blusa Básica de Tirantes",
    precio: 14.99,
    imagenes: ["/img/blusa7.png", "/img/blusa7-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa básica de tirantes, ideal para capas o uso en verano.",
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Blanco", codigo: "#FFFFFF" },
      { nombre: "Rojo", codigo: "#FF0000" },
    ],
    tipo: "Básicas",
  },
  {
    id: 8,
    nombre: "Blusa Corta con Volantes",
    precio: 29.99,
    imagenes: ["/img/blusa8.png", "/img/blusa8-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa corta con volantes, perfecta para ocasiones especiales.",
    tallas: ["S", "M", "L"],
    colores: [
      { nombre: "Rosa pálido", codigo: "#FFB6C1" },
      { nombre: "Azul cielo", codigo: "#87CEEB" },
    ],
    tipo: "Cortas",
  },
  {
    id: 9,
    nombre: "Blusa de Vestir con Encaje",
    precio: 44.99,
    imagenes: ["/img/blusa9.png", "/img/blusa9-2.png"],
    categoria: "Blusas",
    descripcion: "Blusa elegante con detalles de encaje, ideal para eventos formales.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Crema", codigo: "#FFFDD0" },
    ],
    tipo: "De vestir",
  },
];

const ITEMS_PER_PAGE = 9;

export default function BlusasPage() {
  const [filtros, setFiltros] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(blusas);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, totalCartAmount } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const resultados = blusas.filter((blusa) => {
      const cumpleFiltros = filtros.length === 0 || filtros.includes(blusa.tipo);
      const cumpleBusqueda = blusa.nombre.toLowerCase().includes(busqueda.toLowerCase());
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
        <h1 className="text-3xl font-bold mb-6">Blusas</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar blusas..."
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
                    <h3 className="font-semibold mb-2">Tipo de blusa</h3>
                    {tiposBlusas.map((tipo) => (
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
                            <h3 className="font-semibold text-lg  mb-2">{producto.nombre}</h3>
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