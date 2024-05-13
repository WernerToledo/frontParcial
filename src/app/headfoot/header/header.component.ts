import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { EncrypServiceService } from '../../Encryp/encryp-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario/usuario.model';
import { Libro } from '../../models/Libro/libro.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usName: String|null = null;
  idRol?: number|undefined|null;
  usuario?: Usuario;
  bandSesion?: boolean = false;
  libros?:Libro[];
  cantidadDatosEnPrestamo?: number;

  constructor(private router: Router, private encryptionService:EncrypServiceService){}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.conteoDetPrestamo();
        this.RevisarUser();
      }
    });
  }
  //para el user
  LibrosUserView(){
    this.router.navigate(['userLibro']);
  }

  PrestamoUserView(){
    this.router.navigate(['userPrestamo']);
  }

  LoginView(){
    this.router.navigate(['login']);
  }

  //para el admin
  UsuariosAdminView(){
    this.router.navigate(['usuarios']);
  }

  LibrosAdminView(){
    this.router.navigate(['adminLibro']);
  }
  ReportesAdminView(){
    this.router.navigate(['reportes']);
  }

  CategoriasVerView(){
    this.router.navigate(['categoriasVer']);
  }
  
  Categorias(){
    this.router.navigate(['categorias']);
  }
  
  IndexAdminView(){
    this.router.navigate(['']);
  }

  
  public RevisarUser(){
    const data = this.encryptionService.decryptAndGetData('credential');
    const librosSesion = this.encryptionService.decryptAndGetData('libros');
    
    this.libros = librosSesion;
    this.usuario = data;
    if (this.usuario && this.usuario.username != null && this.usuario.rol != null) {
      this.usName = this.usuario.username;
      this.idRol = this.usuario.rol.idRol;    
    }
    if (this.bandSesion) {
      this.bandSesion = false;
      this.router.navigate(['']);
    }

  }

  conteoDetPrestamo(){  
    // Obtener los datos de la sesión "prestamo" y obtener su longitud
    const datosPrestamo = sessionStorage.getItem('prestamo');
    if (datosPrestamo) {
      const datosPrestamoObjeto = JSON.parse(datosPrestamo);
      this.cantidadDatosEnPrestamo = Object.keys(datosPrestamoObjeto).length;
    } else {
      this.cantidadDatosEnPrestamo = undefined;
    }
  }

  detPrestamo(){
    this.router.navigate(['detprestamo']);
  }

  CerrarSesion(){
    sessionStorage.removeItem('credential');
    this.usName = null;
    this.idRol=null;
    this.bandSesion =true;
    this.RevisarUser();
  }
}
