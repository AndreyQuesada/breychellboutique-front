"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, X, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product, CartItem } from "@/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";


export default function BreychellBoutique() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState("inicio");
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Product | null>(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [listaDeseosAbierta, setListaDeseosAbierta] = useState(false);

  const categoriasDestacadas = [
    "Pantalones",
    "Blusas",
    "Vestidos",
    "Accesorios",
  ];
  const todasLasCategorias = [
    "Pantalones",
    "Blusas",
    "Perfumería",
    "Enterizos",
    "Vestidos",
    "Accesorios",
    "Ropa-Interior",
  ];
  const [productos, setProductos] = useState<Product[]>([
    {
      id: 1,
      nombre: "Pantalón Vaquero",
      precio: 49.99,
      imagenes: [
        "/img/pantalon-vaquero-1.jpg",
        "/img/pantalon-vaquero-2.jpg",
        "/img/pantalon-vaquero-3.jpg",
      ],
      categoria: "Pantalones",
      descripcion: "Pantalón vaquero clásico con un ajuste cómodo y duradero.",
      tallas: ["XS", "S", "M", "L", "XL"],
      colores: [
        { nombre: "Azul", codigo: "#0000FF" },
        { nombre: "Negro", codigo: "#000000" },
        { nombre: "Gris", codigo: "#808080" },
      ],
    },
    {
      id: 2,
      nombre: "Blusa Elegante",
      precio: 39.99,
      imagenes: [
        "/img/blusa-elegante-1.jpg",
        "/img/blusa-elegante-2.jpg",
        "/img/blusa-elegante-3.jpg",
      ],
      categoria: "Blusas",
      descripcion:
        "Blusa elegante perfecta para ocasiones especiales o el trabajo.",
      tallas: ["XS", "S", "M", "L", "XL"],
      colores: [
        { nombre: "Blanco", codigo: "#FFFFFF" },
        { nombre: "Negro", codigo: "#000000" },
        { nombre: "Rosa", codigo: "#FFC0CB" },
      ],
    },
    {
      id: 3,
      nombre: "Vestido de Noche",
      precio: 89.99,
      imagenes: [
        "/img/vestido-noche-1.jpg",
        "/img/vestido-noche-2.jpg",
        "/img/vestido-noche-3.jpg",
      ],
      categoria: "Vestidos",
      descripcion:
        "Elegante vestido de noche con detalles de encaje y espalda descubierta.",
      tallas: ["XS", "S", "M", "L", "XL"],
      colores: [
        { nombre: "Negro", codigo: "#000000" },
        { nombre: "Rojo", codigo: "#FF0000" },
        { nombre: "Azul marino", codigo: "#000080" },
      ],
    },
    {
      id: 4,
      nombre: "Collar de Perlas",
      precio: 129.99,
      imagenes: [
        "/img/collar-perlas-1.jpg",
        "/img/collar-perlas-2.jpg",
        "/img/collar-perlas-3.jpg",
      ],
      categoria: "Accesorios",
      descripcion: "Elegante collar de perlas cultivadas con broche de plata.",
      colores: [
        { nombre: "Blanco", codigo: "#FFFFFF" },
        { nombre: "Crema", codigo: "#FFFDD0" },
      ],
    },
  ]);

  const [productosFiltrados, setProductosFiltrados] = useState(productos);

  const { cart, addToCart, removeFromCart, updateQuantity, totalCartAmount } =
    useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();

  useEffect(() => {
    const resultados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultados);
  }, [busqueda, productos]);

  const irACategoria = (categoria: string) => {
    router.push(`/categoria/${categoria.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header
        categoriasDestacadas={categoriasDestacadas}
        todasLasCategorias={todasLasCategorias}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
        setListaDeseosAbierta={setListaDeseosAbierta}
        listaDeseosAbierta={listaDeseosAbierta}
        setCarritoAbierto={setCarritoAbierto}
        carritoAbierto={carritoAbierto}
        listaDeseos={wishlist}
        carrito={cart}
        setPaginaActual={setPaginaActual}
        irACategoria={irACategoria}
        setMenuAbierto={setMenuAbierto}
      />

      <main className="flex-grow">
        {paginaActual === "inicio" && (
          <>
            {/* Banner principal */}
            <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
              <Image
                src="/img/banner1.png"
                alt="Colección de moda"
                layout="fill"
                objectFit="cover"
                className="opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Nueva Colección
                  </h1>
                  <p className="text-xl md:text-2xl text-white mb-8">
                    Descubre las últimas tendencias en moda
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    Comprar ahora
                  </Button>
                </div>
              </div>
            </div>

            <section className="py-16 bg-white hidden md:block">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Explora nuestras categorías
                </h2>
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 w-full">
                    {todasLasCategorias.slice(0, 4).map((categoria) => (
                      <CategoryCard
                        key={categoria}
                        categoria={categoria}
                        onClick={() => irACategoria(categoria)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 w-full md:w-3/4">
                    {todasLasCategorias.slice(4).map((categoria) => (
                      <CategoryCard
                        key={categoria}
                        categoria={categoria}
                        onClick={() => irACategoria(categoria)}
                        className="flex-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Sección de Explora nuestras categorías (visible solo en mobile) */}
            <section className="py-8 bg-white md:hidden">
              <div className="max-w-md mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Explora nuestras categorías
                </h2>
                <Swiper
                  modules={[Pagination, EffectCoverflow]}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={1.5}
                  spaceBetween={-20}
                  loop={true}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{ clickable: true }}
                  className="mySwiper"
                >
                  {todasLasCategorias.map((categoria) => (
                    <SwiperSlide key={categoria}>
                      <CategoryCard
                        categoria={categoria}
                        onClick={() => irACategoria(categoria)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* Productos destacados */}
            <section className="py-16 bg-gray-100">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Productos Destacados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {productos.map((producto) => (
                    <ProductCard
                      key={producto.id}
                      producto={producto}
                      onSelectProduct={setProductoSeleccionado}
                      onAddToWishlist={addToWishlist}
                      isInWishlist={isInWishlist}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {paginaActual !== "inicio" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">
              {paginaActual}
            </h1>
            {/* Aquí iría el contenido específico de cada página de categoría */}
          </div>
        )}

        {/* Modal de producto */}
        <ProductModal
          product={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          tallaSeleccionada={tallaSeleccionada}
          setTallaSeleccionada={setTallaSeleccionada}
          colorSeleccionado={colorSeleccionado}
          setColorSeleccionado={setColorSeleccionado}
          onAddToCart={(product) => addToCart(product as CartItem)}
        />

        {/* Carrito */}
        <AnimatePresence>
          {carritoAbierto && (
            <CartSidebar
              cart={cart}
              onClose={() => setCarritoAbierto(false)}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              totalCartAmount={totalCartAmount}
            />
          )}
        </AnimatePresence>

        {/* Lista de deseos */}
        <AnimatePresence>
          {listaDeseosAbierta && (
            <WishlistSidebar
              wishlist={wishlist}
              onClose={() => setListaDeseosAbierta(false)}
              onRemoveFromWishlist={removeFromWishlist}
              onSelectProduct={setProductoSeleccionado}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

const CategoryCard = ({ categoria, onClick, className = "" }) => (
  <Card
    className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${className}`}
    onClick={onClick}
  >
    <CardContent className="p-0">
      <div className="relative h-48">
        <Image
          src={`/img/${categoria.toLowerCase()}.png`}
          alt={categoria}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-300 hover:bg-opacity-20">
          <h3 className="text-xl font-bold text-white">{categoria}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProductCard = ({
  producto,
  onSelectProduct,
  onAddToWishlist,
  isInWishlist,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    onClick={() => onSelectProduct(producto)}
  >
    <Image
      src={producto.imagenes[0]}
      alt={producto.nombre}
      width={300}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{producto.nombre}</h3>
      <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
      <div className="flex justify-between mt-2">
        <Button
          className="flex-1 mr-2"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(producto);
          }}
        >
          Ver detalles
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist(producto);
          }}
          className={isInWishlist(producto.id) ? "text-red-500" : ""}
        >
          <Heart
            className="h-4 w-4"
            fill={isInWishlist(producto.id) ? "currentColor" : "none"}
          />
        </Button>
      </div>
    </div>
  </motion.div>
);

const ProductModal = ({
  product,
  onClose,
  tallaSeleccionada,
  setTallaSeleccionada,
  colorSeleccionado,
  setColorSeleccionado,
  onAddToCart,
}) => (
  <Dialog open={!!product} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{product?.nombre}</DialogTitle>
        <DialogDescription>{product?.descripcion}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <ImageGallery images={product?.imagenes || []} />
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="precio" className="text-right">
            Precio
          </Label>
          <div className="col-span-3">${product?.precio.toFixed(2)}</div>
        </div>
        {product?.tallas && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="talla" className="text-right">
              Talla
            </Label>
            <RadioGroup
              defaultValue={tallaSeleccionada}
              onValueChange={setTallaSeleccionada}
              className="col-span-3"
            >
              {product.tallas.map((talla) => (
                <div key={talla} className="flex items-center space-x-2">
                  <RadioGroupItem value={talla} id={`talla-${talla}`} />
                  <Label htmlFor={`talla-${talla}`}>{talla}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        {product?.colores && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <RadioGroup
              defaultValue={colorSeleccionado}
              onValueChange={setColorSeleccionado}
              className="col-span-3 flex flex-wrap gap-2"
            >
              {product.colores.map((color) => (
                <div key={color.nombre} className="flex items-center">
                  <RadioGroupItem
                    value={color.nombre}
                    id={`color-${color.nombre}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`color-${color.nombre}`}
                    className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                    style={{ backgroundColor: color.codigo }}
                  >
                    {colorSeleccionado === color.nombre && (
                      <div className="w-4 h-4 rounded-full bg-white" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
      <Button
        onClick={() =>
          onAddToCart({
            ...product,
            talla: tallaSeleccionada,
            color: colorSeleccionado,
            cantidad: 1,
          })
        }
      >
        Agregar al carrito
      </Button>
    </DialogContent>
  </Dialog>
);

const CartSidebar = ({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveFromCart,
  totalCartAmount,
}) => (
  <motion.div
    initial={{ opacity: 0, x: "100%" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "100%" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-30 overflow-y-auto"
  >
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Carrito</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.talla}-${item.color}`}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h3 className="font-semibold">{item.nombre}</h3>
                <p className="text-sm text-gray-600">
                  ${item.precio.toFixed(2)} x {item.cantidad}
                </p>
                {item.talla && (
                  <p className="text-sm text-gray-600">Talla: {item.talla}</p>
                )}
                {item.color && (
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                )}
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onUpdateQuantity(item.id, item.talla, item.color, -1)
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.cantidad}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onUpdateQuantity(item.id, item.talla, item.color, 1)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onRemoveFromCart(item.id, item.talla, item.color)
                  }
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">
              Total: ${totalCartAmount.toFixed(2)}
            </p>
            <Button className="w-full mt-4">Proceder al pago</Button>
          </div>
        </>
      )}
    </div>
  </motion.div>
);

const WishlistSidebar = ({
  wishlist,
  onClose,
  onRemoveFromWishlist,
  onSelectProduct,
}) => (
  <motion.div
    initial={{ opacity: 0, x: "100%" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "100%" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-30 overflow-y-auto"
  >
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Deseos</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      {wishlist.length === 0 ? (
        <p>Tu lista de deseos está vacía.</p>
      ) : (
        <>
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h3 className="font-semibold">{item.nombre}</h3>
                <p className="text-sm text-gray-600">
                  ${item.precio.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="mr-2"
                >
                  Ver detalles
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFromWishlist(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  </motion.div>
);
