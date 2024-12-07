"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Search, ChevronRight, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "@/types";
import CartSidebar from "@/components/CartSidebar";
import WishlistSidebar from "@/components/WishlistSidebar";

const vestidos: Product[] = [
  {
    id: 1,
    nombre: "Vestido de Noche Elegante",
    precio: 89.99,
    imagenes: ["/img/vestido1.png", "/img/vestido1-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido largo de noche con detalles de encaje, perfecto para eventos formales.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Rojo", codigo: "#FF0000" },
    ],
  },
  {
    id: 2,
    nombre: "Vestido Casual de Verano",
    precio: 39.99,
    imagenes: ["/img/vestido2.png", "/img/vestido2-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido ligero y fresco, ideal para días soleados y paseos por la playa.",
    tallas: ["XS", "S", "M", "L"],
    colores: [
      { nombre: "Azul cielo", codigo: "#87CEEB" },
      { nombre: "Blanco", codigo: "#FFFFFF" },
    ],
  },
  {
    id: 3,
    nombre: "Vestido Coctel",
    precio: 69.99,
    imagenes: ["/img/vestido3.png", "/img/vestido3-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido elegante para cocteles y eventos semi-formales.",
    tallas: ["S", "M", "L"],
    colores: [
      { nombre: "Verde esmeralda", codigo: "#50C878" },
      { nombre: "Dorado", codigo: "#FFD700" },
    ],
  },
  {
    id: 4,
    nombre: "Vestido Boho Chic",
    precio: 54.99,
    imagenes: ["/img/vestido4.png", "/img/vestido4-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido largo estilo bohemio con estampados étnicos.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Multicolor", codigo: "#FFFFFF" },
    ],
  },
  {
    id: 5,
    nombre: "Vestido de Oficina",
    precio: 59.99,
    imagenes: ["/img/vestido5.png", "/img/vestido5-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido formal y elegante, perfecto para el entorno laboral.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Gris", codigo: "#808080" },
      { nombre: "Azul marino", codigo: "#000080" },
    ],
  },
  {
    id: 6,
    nombre: "Vestido Playero",
    precio: 34.99,
    imagenes: ["/img/vestido6.png", "/img/vestido6-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido ligero y fresco, ideal para días de playa o piscina.",
    tallas: ["S", "M", "L"],
    colores: [
      { nombre: "Turquesa", codigo: "#40E0D0" },
      { nombre: "Coral", codigo: "#FF7F50" },
    ],
  },
  {
    id: 7,
    nombre: "Vestido de Fiesta Corto",
    precio: 79.99,
    imagenes: ["/img/vestido7.png", "/img/vestido7-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido corto y elegante para fiestas y eventos especiales.",
    tallas: ["XS", "S", "M", "L"],
    colores: [
      { nombre: "Plateado", codigo: "#C0C0C0" },
      { nombre: "Rosa", codigo: "#FFC0CB" },
    ],
  },
  {
    id: 8,
    nombre: "Vestido Maxi Floral",
    precio: 64.99,
    imagenes: ["/img/vestido8.png", "/img/vestido8-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido largo con estampado floral, perfecto para ocasiones especiales al aire libre.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Floral", codigo: "#FFFFFF" },
    ],
  },
  {
    id: 9,
    nombre: "Vestido Camisero",
    precio: 49.99,
    imagenes: ["/img/vestido9.png", "/img/vestido9-2.png"],
    categoria: "Vestidos",
    descripcion: "Vestido estilo camisero, versátil y cómodo para el día a día.",
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: [
      { nombre: "Beige", codigo: "#F5F5DC" },
      { nombre: "Azul claro", codigo: "#ADD8E6" },
    ],
  },
];

const ITEMS_PER_PAGE = 9;

export default function VestidosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(vestidos);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, totalCartAmount } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const resultados = vestidos.filter((vestido) =>
      vestido.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultados);
    setCurrentPage(1);
  }, [busqueda]);

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
        <h1 className="text-3xl font-bold mb-6">Vestidos</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar vestidos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
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