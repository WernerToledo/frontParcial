export class Categoria {

    idCategoria?: number;
    nombre?: string;
    estado?: string;
    edicion?: string;

    constructor(idCategoria?: number, nombre?: string, estado?: string, edicion?: string) {
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.estado = estado;
        this.edicion = edicion;
    }
}
