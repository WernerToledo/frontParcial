import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../services/Libro/libros.service';
import { Router } from '@angular/router';
import { Libro } from '../../models/Libro/libro.model';
import { JsonResponse } from '../../models/Response/json-response.model';
import { BrowserModule } from '@angular/platform-browser';
import { EncrypServiceService } from '../../Encryp/encryp-service.service';
import { PrestamoService } from '../../services/Prestamo/prestamo.service';



@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  jsonResponse:JsonResponse|undefined;
  Libros:Libro[]|undefined;
  message?:String;
  
  dataLibros?:any[];
  id?: number;
  nombre?: string;
  foto?:string;
  cantidad?:number;

  constructor(private router: Router, private libroService: LibrosService, private encryptionService: EncrypServiceService,
              private prestamoservice:PrestamoService){

  }


  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(){
    
    this.prestamoservice.getLibrosStock().subscribe(
      (response: JsonResponse) => {
        this.jsonResponse = response;
        if (this.jsonResponse?.status == '000') {
          this.dataLibros = this.jsonResponse?.data
          this.router.navigate(['userLibro']);
        }
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  guardarPrestamo(obId?: number, nombre?: string, foto?: string, cantidadStock?: number) {

    let dataActual: any[] = [];
    const data = sessionStorage.getItem('prestamo');
  
    if (data) {
      dataActual = JSON.parse(data);
    }
  

    const encontrado = dataActual.find(item => item.id === obId);
    if (encontrado) {
      encontrado.cantidad += this.cantidad;
      if (cantidadStock != undefined && encontrado.cantidad <= cantidadStock) {
        const nuevaDataString = JSON.stringify(dataActual);
        sessionStorage.setItem('prestamo', nuevaDataString);
        this.cantidad = undefined;
        this.recargarPagina();
        
      } else {
        this.cantidad = undefined;
        this.id = obId;
        this.message = 'Stock insuficiente';
        console.log(this.message);
        this.obtenerLibros();
      }
    } 
    else {
      if (cantidadStock !== undefined && this.cantidad !== undefined) { 
        if (this.cantidad <= cantidadStock) {
          this.message = '';
  
          const nuevoPrestamo = {
            id: obId,
            nombre: nombre,
            foto: foto,
            cantidad: this.cantidad,
            cantidadStock: cantidadStock
          };
  
          dataActual.push(nuevoPrestamo);
  
          const nuevaDataString = JSON.stringify(dataActual);
          sessionStorage.setItem('prestamo', nuevaDataString);
          this.cantidad = undefined;
          this.recargarPagina();

        } else {
          this.cantidad = undefined;
          this.id = obId;
          this.message = 'Stock insuficiente';
          this.obtenerLibros();
        }
      } else {
        this.cantidad = undefined;
        this.id = obId;
        this.message = 'Error: debe ingresar la cantidad';
        console.log(this.message);
        this.recargarPagina();
      }
    }
  }
  
  recargarPagina() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['userLibro']);
    });
  }
 
}

