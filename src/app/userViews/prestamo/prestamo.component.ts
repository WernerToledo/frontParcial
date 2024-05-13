import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from '../../services/Libro/libros.service';
import { Detprestamo } from '../../models/detprestamos/detprestamo.model';
import { DetprestamoService } from '../../services/detPrestamo/detprestamo.service';
import { EncrypServiceService } from '../../Encryp/encryp-service.service';
import { JsonResponse } from '../../models/Response/json-response.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Prestamo } from '../../models/prestamos/prestamo.model';
import { PrestamoService } from '../../services/Prestamo/prestamo.service';

@Component({
  selector: 'app-prestamo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css'
})
export class PrestamoComponent {

  detPrestamos?: Detprestamo[];
  jsonResponse?: JsonResponse;
  idPrestamo?: number;
  prestamos?: Prestamo[]=[];
  filtroDetPrestamo?: Detprestamo[] = [];



  constructor(private router: Router, private detprestamoService: DetprestamoService, private encryptionService: EncrypServiceService,
              private prestamoservice:PrestamoService  ) {
  }

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  obtenerPrestamos() {
    const usuario = this.encryptionService.decryptAndGetData('credential');
    const id = usuario['idUsuario'];

    this.detprestamoService.getDetPrestamo(id).subscribe(
      (response: JsonResponse) => {
        this.jsonResponse = response;
        if (this.jsonResponse?.status == '000') {
          this.detPrestamos = this.jsonResponse?.data
          this.ListaPrestamos(this.detPrestamos);
          this.router.navigate(['userPrestamo']);
        }
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );

  }

  //para la combo
  ListaPrestamos(obDetPrestamo?: Detprestamo[]) {

    if (obDetPrestamo !== undefined) {
      for (let index = 0; index < obDetPrestamo.length; index++) {
        if (index == 0) {   
          this.prestamos?.push(new Prestamo(obDetPrestamo[index].prestamo?.idPrestamo, obDetPrestamo[index].prestamo?.fechaSistema, obDetPrestamo[index].prestamo?.estado, undefined));
        }
        else if(obDetPrestamo[index].prestamo?.idPrestamo != obDetPrestamo[index-1].prestamo?.idPrestamo){
          this.prestamos?.push(new Prestamo(obDetPrestamo[index].prestamo?.idPrestamo, obDetPrestamo[index].prestamo?.fechaSistema, obDetPrestamo[index].prestamo?.estado, undefined));
        }
      }
    }
  }

  //filtra para los prestamos
  cargarTable() {
    this.filtroDetPrestamo = [];

    this.detPrestamos?.forEach(detPrestamo =>{
      if (detPrestamo.prestamo?.idPrestamo == this.idPrestamo) {
        this.filtroDetPrestamo?.push(detPrestamo);
      }
    });
  }

  devolverByOne(id?:number){
    this.detprestamoService.devolverLibro(id).subscribe((response:JsonResponse)=>{
        this.cargarTable();
        this.recargarPagina();
    });
  }

  delvolverTodo(){
    if (this.filtroDetPrestamo != undefined && this.filtroDetPrestamo.length > 0) {
      this.filtroDetPrestamo.forEach(detPrestamo => {
        this.detprestamoService.devolverLibro(detPrestamo.idDetPrestamo).subscribe((response:JsonResponse)=>{
          this.cargarTable();
          this.recargarPagina();
      });
      });
    }
  }


  recargarPagina() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['userPrestamo']);
    });
  }
}
