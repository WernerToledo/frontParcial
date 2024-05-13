import { Libro } from "../Libro/libro.model";
import { Prestamo } from "../prestamos/prestamo.model";
export class Detprestamo {

    idDetPrestamo?: number;
    cantidad?: number;
    estado?: string;
    libro?: Libro;
    prestamo?: Prestamo;

    constructor(idDetPrestamo?: number, cantidad?: number, estado?: string, libro?: Libro, prestamo?: Prestamo) {
        this.idDetPrestamo = idDetPrestamo;
        this.cantidad = cantidad;
        this.estado = estado;
        this.libro = libro;
        this.prestamo = prestamo;
    }
}
