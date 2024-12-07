export interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagenes: string[];
  categoria: string;
  descripcion: string;
  tipo?: string;
  tallas?: string[];
  colores?: { nombre: string; codigo: string }[];
}

export interface CartItem extends Product {
  cantidad: number;
  talla?: string;
  color?: string;
}