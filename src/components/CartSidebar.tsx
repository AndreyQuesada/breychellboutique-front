import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types";

interface CartSidebarProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, talla: string, color: string, change: number) => void;
  onRemoveFromCart: (id: number, talla: string, color: string) => void;
  totalCartAmount: number;
}

export default function CartSidebar({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveFromCart,
  totalCartAmount,
}: CartSidebarProps) {
  return (
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
            <span className="sr-only">Cerrar carrito</span>
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
                    <span className="sr-only">Disminuir cantidad</span>
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
                    <span className="sr-only">Aumentar cantidad</span>
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
                    <span className="sr-only">Eliminar del carrito</span>
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
}