import { Usuario } from "../usuario/usuario.model";
export class Prestamo {

    idPrestamo?: number;
    fechaSistema?: Date;
    estado?: string;
    usuario?: Usuario;

    constructor(idPrestamo?: number, fechaSistema?: Date, estado?: string, usuario?: Usuario) {
        this.idPrestamo = idPrestamo;
        this.fechaSistema = fechaSistema;
        this.estado = estado;
        this.usuario = usuario;
    }
}
