import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/Categoria/categoria.service';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Categoria } from '../../models/categorias/categoria.model';

@Component({
  selector: 'app-categorias-agg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias-agg.component.html',
  styleUrl: './categorias-agg.component.css'
})
export class CategoriasAggComponent {
  jsonResponse?:JsonResponse;
  categorias?:Categoria[];
  guardarCategoria?: Categoria;


  //variables para la categoria 
  id?: number;
  nombre?: string;
  estado?: string = 'a';
  edicion?: string;

  ngOnInit(): void {
    this.obtenerCategorias();
  }


  constructor(private router: Router, private Categoriaservice: CategoriaService){

  }

  obtenerCategorias(){
    this.Categoriaservice.getCategorias().subscribe(
      (response: JsonResponse)=>{
        this.jsonResponse = response;
        console.log(this.jsonResponse);
        if (this.jsonResponse?.status == '000') {
            this.categorias=this.jsonResponse.data;
            this.router.navigate(['categorias']);   
        }
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

  AgregarCategoria(){
    if (this.id != undefined) {
      this.guardarCategoria = new Categoria(this.id, this.nombre, this.estado, this.edicion);
    }
    else{
      this.guardarCategoria = new Categoria(undefined, this.nombre, this.estado, this.edicion);
    }
    
    this.Categoriaservice.SaveCategoria(this.guardarCategoria).subscribe((response:JsonResponse)=> {
      this.jsonResponse = response;
      this.limpiarData();
      this.obtenerCategorias();
    });
  }

  activarEstado(id?:number){
    this.guardarCategoria = new Categoria(id, undefined, undefined, undefined);
    console.log(this.guardarCategoria);
    this.Categoriaservice.ActivateCategoria(this.guardarCategoria).subscribe((response:JsonResponse)=>{
      this.limpiarData();
      this.obtenerCategorias();
    });
  }

  desactivarEstado(id?:number){
    this.guardarCategoria = new Categoria(id, undefined, undefined, undefined);
    this.Categoriaservice.DesactivateCategoria(this.guardarCategoria).subscribe((response:JsonResponse)=>{
      this.limpiarData();
      this.obtenerCategorias();
    },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      });
  }  

  cargarData(obId?: number, obNombre?: string, obEdicion?: string){
    this.id = obId;
    this.nombre = obNombre;
    this.edicion = obEdicion;
  }

  limpiarData(){
    this.id = undefined;
    this.nombre = undefined;
    this.edicion = undefined;
  }

}
