import { Factura } from './Factura';
import { DetalleFactura } from './DetalleFactura';

export interface venta {
    factura :Factura,
    detalles:DetalleFactura[]
}