import { Component } from '@angular/core';
import { Detprestamo } from '../../models/detprestamos/detprestamo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncrypServiceService } from '../../Encryp/encryp-service.service';
import { DetprestamoService } from '../../services/detPrestamo/detprestamo.service';
import { PrestamoService } from '../../services/Prestamo/prestamo.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario/usuario.model';
import { Prestamo } from '../../models/prestamos/prestamo.model';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Libro } from '../../models/Libro/libro.model';

@Component({
  selector: 'app-detprestamo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detprestamo.component.html',
  styleUrl: './detprestamo.component.css'
})
export class DetprestamoComponent {
  detPrestamo?: Detprestamo;
  dataSesion?: any[]= [];
  message?:string;
  GuardarPrestamos?: Prestamo;
  lasPrestamo?:Prestamo;
  jsonData?: JsonResponse;
  jsonDataDetP?: JsonResponse;

  //variables para actualizar
  id?: number;
  cantidad?: number;
  messageActu?: string;

  constructor(private encryptionService: EncrypServiceService, private detService: DetprestamoService, 
              private prestamoservice:PrestamoService, private router:Router){

  }
  ngOnInit(): void {
    this.obtenerDetPrestamos();
  }

  obtenerDetPrestamos(){
    const data = sessionStorage.getItem("prestamo");
    if (data) {
      this.dataSesion = JSON.parse(data);
    }
    else{
      this.message = "No hay prestamos";
    }
  }


  GuardarPrestamo(){
    let usuario:Usuario = new Usuario();
    usuario = this.encryptionService.decryptAndGetData('credential');

    let fechaActual: Date = new Date();
    if(usuario){
      this.GuardarPrestamos = new Prestamo(undefined, fechaActual, 'a', new Usuario(usuario.idUsuario, undefined, undefined, undefined, undefined, undefined, undefined));
      
      this.prestamoservice.savePrestamo(this.GuardarPrestamos).subscribe((response:JsonResponse)=>{
        this.jsonData = response;
        if(this.jsonData.status == "000" && this.dataSesion != undefined){
          this.lasPrestamo = this.jsonData.data;

          //ingresp del detalle de prestamo
          this.dataSesion.forEach(detPrestamos => {
            this.detPrestamo = new Detprestamo(undefined, detPrestamos.cantidad, "a", new Libro(detPrestamos.id), new Prestamo(this.lasPrestamo?.idPrestamo));
            console.log(this.detPrestamo);
            this.detService.saveDetPrestamo(this.detPrestamo).subscribe((response:JsonResponse) =>{
              this.jsonDataDetP = response;
              if (this.jsonDataDetP.status == "000") {
                console.log("exito");
                this.limpiarSesion();
              }
              else{
                console.log("Error al ingresar el detalle");
              }
            });
          });
        }
      });
    }
    else{
      this.router.navigate(['login']);
    }
        
  }

  EliminarElemento(id?:number){
    if (id!=undefined && this.dataSesion != undefined) {
      this.dataSesion = this.dataSesion.filter(prestamo => prestamo.id !== id);
      const nuevaDataString = JSON.stringify(this.dataSesion);
      sessionStorage.setItem('prestamo', nuevaDataString);
      this.recargarPagina();
    }
  }

  limpiarSesion(){
    sessionStorage.removeItem('prestamo');
    this.dataSesion = undefined;
    this.router.navigate(['userLibro']);
  }

  recargarPagina() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['detprestamo']);
    });
  }

  actualizarPrestamo(){
    const data = sessionStorage.getItem("prestamo");
    if (data) {
      this.dataSesion = JSON.parse(data);
    }
    if (this.dataSesion!= undefined) {
        const encontrado = this.dataSesion.find(item => item.id === this.id);
        console.log('viejo',encontrado.cantidad)
      if (encontrado && this.cantidad != undefined) {
        if (this.cantidad <= encontrado.cantidadStock) {
          encontrado.cantidad = this.cantidad;
          const nuevaDataString = JSON.stringify(this.dataSesion);
          sessionStorage.setItem('prestamo', nuevaDataString);
          this.cantidad = undefined;
          this.recargarPagina();
        }
        else{
          this.cantidad = undefined;
          this.message = "No hay suficiente Stock"
          this.obtenerDetPrestamos();
        }
      }
    }
    
  }

  cargarId(obId?:number){
    this.id = obId;
    console.log(this.id);
  }
}
