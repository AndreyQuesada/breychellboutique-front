"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import WishlistSidebar from "@/components/WishlistSidebar";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "@/types";

export default function ProductPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const { toast } = useToast();
  const { addToCart, cart, removeFromCart, updateQuantity, totalCartAmount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlist } = useWishlist();

  useEffect(() => {
    const productString = searchParams.get("product");
    if (productString) {
      try {
        const parsedProduct = JSON.parse(productString) as Product;
        setProduct(parsedProduct);
        setMainImage(parsedProduct.imagenes[0]);
      } catch (error) {
        console.error("Error parsing product data:", error);
      }
    }
  }, [searchParams]);

  const handleAddToCart = () => {
    if (!product || (!product.tallas && !tallaSeleccionada) || !colorSeleccionado) {
      toast({
        title: "Error",
        description: product.tallas 
          ? "Por favor, selecciona una talla y un color antes de agregar al carrito."
          : "Por favor, selecciona un color antes de agregar al carrito.",
        variant: "destructive",
      });
      return;
    }
    addToCart({ ...product, cantidad, talla: tallaSeleccionada, color: colorSeleccionado });
    toast({
      title: "Producto agregado",
      description: "El producto ha sido agregado al carrito.",
    });
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Producto removido",
        description: "El producto ha sido removido de tu lista de deseos.",
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Producto agregado",
        description: "El producto ha sido agregado a tu lista de deseos.",
      });
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  const similarProducts = [
    {
      id: 3,
      nombre: "Jeans Skinny",
      precio: 54.99,
      imagenes: ["/img/pantalon3.png"],
    },
    {
      id: 4,
      nombre: "Pantalón Cargo",
      precio: 64.99,
      imagenes: ["/img/pantalon4.png"],
    },
    {
      id: 5,
      nombre: "Jeans Boyfriend",
      precio: 59.99,
      imagenes: ["/img/pantalon5.png"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header
        categoriasDestacadas={["Pantalones", "Blusas", "Vestidos", "Accesorios"]}
        todasLasCategorias={["Pantalones", "Blusas", "Perfumería", "Enterizos", "Vestidos", "Accesorios", "Ropa interior"]}
        setBusqueda={() => {}}
        busqueda=""
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src={mainImage}
                alt={product.nombre}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.imagenes.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative aspect-square rounded-md overflow-hidden cursor-pointer shadow-md"
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.nombre} - Imagen ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-gray-900">{product.nombre}</h1>
            <p className="text-2xl font-semibold text-gray-800">${product.precio.toFixed(2)} USD</p>
            <p className="text-gray-600">{product.descripcion}</p>

            {product.tallas && (
              <div>
                <h2 className="font-semibold mb-2 text-gray-800">TALLA</h2>
                <RadioGroup value={tallaSeleccionada} onValueChange={setTallaSeleccionada}>
                  <div className="flex flex-wrap gap-2">
                    {product.tallas.map((talla) => (
                      <div key={talla}>
                        <RadioGroupItem value={talla} id={`talla-${talla}`} className="sr-only" />
                        <Label
                          htmlFor={`talla-${talla}`}
                          className={`border rounded-md px-3 py-2 cursor-pointer transition-colors duration-200 ${
                            tallaSeleccionada === talla ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                          }`}
                        >
                          {talla}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            <div>
              <h2 className="font-semibold mb-2 text-gray-800">COLOR</h2>
              <RadioGroup value={colorSeleccionado} onValueChange={setColorSeleccionado}>
                <div className="flex flex-wrap gap-2">
                  {product.colores.map((color) => (
                    <div key={color.nombre}>
                      <RadioGroupItem value={color.nombre} id={`color-${color.nombre}`} className="sr-only" />
                      <Label
                        htmlFor={`color-${color.nombre}`}
                        className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border-2 transition-transform duration-200 hover:scale-110"
                        style={{ backgroundColor: color.codigo }}
                      >
                        {colorSeleccionado === color.nombre && (
                          <div className="w-4 h-4 rounded-full bg-white" />
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-gray-800">{cantidad}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCantidad(cantidad + 1)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} className="flex-grow bg-black hover:bg-gray-800 text-white transition-colors duration-200">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleWishlist}
                className="border-gray-300 hover:border-gray-400 transition-colors duration-200"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Detalles del producto</h2>
              <p className="text-gray-600">
                Experimenta la exquisitez de la moda europea y estadounidense. Piezas únicas que reflejan tu estilo distinguido. ¡Haz que tu guardarropa sea un viaje de lujo y sofisticación!
              </p>
              <p className="text-gray-600 mt-2">
                Prenda versátil, la puedes combinar para un look casual, look chic, look elegante, te sentirás cómoda y fresca, versátil y creativa.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">También te puede gustar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarProducts.map((similarProduct) => (
              <Link href={`/producto/${similarProduct.id}`} key={similarProduct.id}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={similarProduct.imagenes[0]}
                      alt={similarProduct.nombre}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 font-semibold text-gray-800">{similarProduct.nombre}</h3>
                  <p className="text-gray-600">${similarProduct.precio.toFixed(2)} USD</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
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
              setProduct(product);
              setIsWishlistOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );

}