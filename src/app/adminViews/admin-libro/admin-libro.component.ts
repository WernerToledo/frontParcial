import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosService } from '../../services/Libro/libros.service';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Libro } from '../../models/Libro/libro.model';
import { Categoria } from '../../models/categorias/categoria.model';
import { CategoriaService } from '../../services/Categoria/categoria.service';

@Component({
  selector: 'app-admin-libro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-libro.component.html',
  styleUrl: './admin-libro.component.css'
})
export class AdminLibroComponent {
  
  jsonResponse:JsonResponse|undefined;
  jsonResponseCategorias:JsonResponse|undefined;

  Libros:Libro[]|undefined;
  categorias?: Categoria[];
  libroSave?:Libro = new Libro();

  //variables para cargar el nuevo libro
  id?: number;
  nombre?:String;
  autor?: string;
  cantidad?: number;
  foto?: string;
  estado?: string = 'a';
  idCategoria?: number;


  constructor(private router: Router, private libroService: LibrosService, private categoriaservice:CategoriaService){

  }


  ngOnInit(): void {
    this.obtenerLibros();
    this.obtenerCategorias();
  }

  obtenerLibros(){
    
    this.libroService.getLibros().subscribe(
      (response: JsonResponse) => {
        this.jsonResponse = response;

        if (this.jsonResponse?.status == '000') {
          this.Libros = this.jsonResponse?.data
          this.router.navigate(['adminLibro']);
        }
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  obtenerCategorias(){
      this.categoriaservice.getCategorias().subscribe(
        (response: JsonResponse)=>{
          this.jsonResponseCategorias = response;
          if (this.jsonResponseCategorias.status == '000') {
            this.categorias = this.jsonResponseCategorias.data;
          }
        },
        (error) => {
          console.error('Error al obtener los libros:', error);
        }
        
      );
  }

  guardarLibro(){
    //creacion del nuevo libro 
    if (this.id != undefined) {
      this.libroSave = new Libro(this.id, this.nombre?.toString(),this.autor?.toString(),this.cantidad, this.foto, this.estado, new Categoria(this.idCategoria));  
    }
    else{
      this.libroSave = new Libro(undefined, this.nombre?.toString(),this.autor?.toString(),this.cantidad, this.foto, this.estado, new Categoria(this.idCategoria));
    }
    
    this.libroService.SaveLibro(this.libroSave).subscribe((response:JsonResponse)=>{
      this.jsonResponse = response;
      this.limpiarData();
      this.obtenerLibros();
      this.obtenerCategorias();
    });
  }

  ActivarLibro(id?:number){
    this.libroService.activateBook(id).subscribe((response:JsonResponse)=>{
      this.jsonResponse = response;
      this.limpiarData();
      this.obtenerLibros();
      this.obtenerCategorias();
    });
  }

  EliminarLibro(id?:number){
    this.libroService.deactivateBook(id).subscribe((response:JsonResponse)=>{
      this.jsonResponse = response;
      this.limpiarData();
      this.obtenerLibros();
      this.obtenerCategorias();
    });
  }

  cargarData(idLibro?: number, obNombre?:String, obAutor?: string, obCantidad?: number, obFoto?: string, obIdCategoria?: number){
    this.id = idLibro;
    this.nombre = obNombre;
    this.autor = obAutor;
    this.cantidad = obCantidad;
    this.foto = obFoto;
    this.idCategoria = obIdCategoria;
  }

  limpiarData(){
    this.id = undefined;
    this.nombre = undefined;
    this.autor = undefined;
    this.cantidad = undefined;
    this.foto = undefined;
    this.idCategoria = undefined;
  }
}
