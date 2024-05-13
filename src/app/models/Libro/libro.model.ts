import { Categoria } from "../categorias/categoria.model";

export class Libro {

    idLibro?: number;
    nombre?: string;
    autor?: string;
    cantidad?: number;
    foto?: string;
    estado?: string;
    categoria?: Categoria
  

  constructor(
    idLibro?: number,
    nombre?: string,
    autor?: string,
    cantidad?: number,
    foto?: string,
    estado?: string,
    categoria?: any
  ) {
    this.idLibro = idLibro;
    this.nombre = nombre;
    this.autor = autor;
    this.cantidad = cantidad;
    this.foto = foto;
    this.estado = estado;
    this.categoria = categoria;
  }

  
}
