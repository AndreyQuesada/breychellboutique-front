import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Product } from "@/types";

interface WishlistSidebarProps {
  wishlist: Product[];
  onClose: () => void;
  onRemoveFromWishlist: (id: number) => void;
  onSelectProduct: (product: Product) => void;
}

export default function WishlistSidebar({
  wishlist,
  onClose,
  onRemoveFromWishlist,
  onSelectProduct,
}: WishlistSidebarProps) {
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
          <h2 className="text-2xl font-bold">Lista de Deseos</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Cerrar lista de deseos</span>
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
                    <span className="sr-only">Eliminar de la lista de deseos</span>
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}