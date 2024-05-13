import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario/usuario.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Rol } from '../../models/Roles/rol.model';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  guardarUser?: Usuario;
  
  nombres?: string;
  apellidos?: string;
  username?: string;
  estado?: string = "a";
  passwordUser?: string;
  rol?: number = 2;

  constructor(private router: Router, private usuarioservice: UsuarioService){

  }

  saveUser(){
   
    this.guardarUser = new Usuario(undefined, this.nombres, this.apellidos, this.username, this.estado, this.passwordUser, new Rol(this.rol, undefined));
    
    this.usuarioservice.saveOrUpdateUs(this.guardarUser).subscribe((response?:JsonResponse) =>{
      this.limpiarData();
      this.router.navigate([""]);
    });
  }

  
  limpiarData(){

    this.nombres = undefined;
    this.apellidos = undefined;
    this.username = undefined;
    this.passwordUser = undefined;
    this.rol = undefined;
  }
}
