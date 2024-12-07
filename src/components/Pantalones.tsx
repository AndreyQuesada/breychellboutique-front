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

const tiposPantalones = ["De vestir", "Jeans", "Skinny", "Shorts", "Plus"];

const pantalones: Product[] = [
  {
    id: 1,
    nombre: "Pantalón de Vestir Elegante",
    precio: 59.99,
    imagenes: ["/img/pantalon1.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón de vestir elegante para ocasiones formales.",
    tallas: ["28", "30", "32", "34", "36"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Gris", codigo: "#808080" },
      { nombre: "Azul marino", codigo: "#000080" },
    ],
    tipo: "De vestir",
  },
  {
    id: 2,
    nombre: "Jeans Clásicos",
    precio: 49.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Jeans clásicos de corte recto y cómodos para el día a día.",
    tallas: ["28", "30", "32", "34", "36"],
    colores: [
      { nombre: "Azul claro", codigo: "#ADD8E6" },
      { nombre: "Azul oscuro", codigo: "#00008B" },
      { nombre: "Negro", codigo: "#000000" },
    ],
    tipo: "Jeans",
  },
  {
    id: 3,
    nombre: "Pantalón Skinny",
    precio: 39.99,
    imagenes: ["/img/pantalon3.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón skinny de ajuste ceñido y estilo moderno.",
    tallas: ["26", "28", "30", "32", "34"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Blanco", codigo: "#FFFFFF" },
      { nombre: "Rojo", codigo: "#FF0000" },
    ],
    tipo: "Skinny",
  },
  {
    id: 4,
    nombre: "Shorts de Verano",
    precio: 29.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Shorts cómodos y frescos para el verano.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Beige", codigo: "#F5F5DC" },
      { nombre: "Azul claro", codigo: "#ADD8E6" },
      { nombre: "Verde oliva", codigo: "#808000" },
    ],
    tipo: "Shorts",
  },
  {
    id: 5,
    nombre: "Pantalón Plus Size",
    precio: 54.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón cómodo y elegante en tallas plus.",
    tallas: ["38", "40", "42", "44", "46"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Azul marino", codigo: "#000080" },
      { nombre: "Gris oscuro", codigo: "#A9A9A9" },
    ],
    tipo: "Plus",
  },
  {
    id: 6,
    nombre: "Joggers Deportivos",
    precio: 34.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Joggers deportivos cómodos y modernos.",
    tallas: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Gris", codigo: "#BEBEBE" },
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Azul", codigo: "#4169E1" },
    ],
    tipo: "Joggers",
  },
  {
    id: 7,
    nombre: "Pantalón Cargo",
    precio: 44.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón cargo con múltiples bolsillos y estilo casual.",
    tallas: ["30", "32", "34", "36", "38"],
    colores: [
      { nombre: "Verde militar", codigo: "#4B5320" },
      { nombre: "Beige", codigo: "#F5F5DC" },
    ],
    tipo: "Cargo",
  },
  {
    id: 8,
    nombre: "Pantalón Chino",
    precio: 39.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón chino casual y elegante.",
    tallas: ["30", "32", "34", "36"],
    colores: [
      { nombre: "Caqui", codigo: "#C3B091" },
      { nombre: "Azul marino", codigo: "#000080" },
    ],
    tipo: "Chino",
  },
  {
    id: 9,
    nombre: "Pantalón de Lana",
    precio: 69.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón de lana para mantener el calor en invierno.",
    tallas: ["30", "32", "34", "36"],
    colores: [
      { nombre: "Gris oscuro", codigo: "#2F4F4F" },
      { nombre: "Marrón", codigo: "#654321" },
    ],
    tipo: "Invierno",
  },
  {
    id: 10,
    nombre: "Jeans Desgastados",
    precio: 59.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Jeans con un diseño desgastado y casual.",
    tallas: ["28", "30", "32", "34", "36"],
    colores: [
      { nombre: "Azul claro", codigo: "#87CEEB" },
      { nombre: "Gris", codigo: "#BEBEBE" },
    ],
    tipo: "Jeans",
  },
  {
    id: 11,
    nombre: "Pantalón de Trabajo",
    precio: 49.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón resistente para uso en trabajos pesados.",
    tallas: ["30", "32", "34", "36", "38"],
    colores: [
      { nombre: "Marrón", codigo: "#8B4513" },
      { nombre: "Azul oscuro", codigo: "#00008B" },
    ],
    tipo: "Trabajo",
  },
  {
    id: 12,
    nombre: "Pantalón con Cinturilla",
    precio: 35.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón cómodo con cinturilla elástica.",
    tallas: ["M", "L", "XL", "XXL"],
    colores: [
      { nombre: "Negro", codigo: "#000000" },
      { nombre: "Gris claro", codigo: "#D3D3D3" },
    ],
    tipo: "Casual",
  },
  {
    id: 13,
    nombre: "Pantalón Capri",
    precio: 27.99,
    imagenes: ["/img/pantalon2.png", "/img/pantalon2.png"],
    categoria: "Pantalones",
    descripcion: "Pantalón capri fresco y cómodo para el verano.",
    tallas: ["S", "M", "L"],
    colores: [
      { nombre: "Blanco", codigo: "#FFFFFF" },
      { nombre: "Azul claro", codigo: "#ADD8E6" },
    ],
    tipo: "Capri",
  },
];

const ITEMS_PER_PAGE = 9;

export default function PantalonesPage() {
  const [filtros, setFiltros] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(pantalones);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, totalCartAmount } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const resultados = pantalones.filter((pantalon) => {
      const cumpleFiltros = filtros.length === 0 || filtros.includes(pantalon.tipo);
      const cumpleBusqueda = pantalon.nombre.toLowerCase().includes(busqueda.toLowerCase());
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
        <h1 className="text-3xl font-bold mb-6">Pantalones</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar pantalones..."
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
                    <h3 className="font-semibold mb-2">Tipo de pantalón</h3>
                    {tiposPantalones.map((tipo) => (
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