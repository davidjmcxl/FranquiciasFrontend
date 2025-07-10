export interface Producto {
  nombre: string;
  precio: number;
}

export interface Sucursal {
  nombre: string;
  productos: Producto[];
}

export interface Franquicia {
  id?: string;
  nombre: string;
  sucursales?: Sucursal[];
}
