import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Usuario } from '../../models/usuario/usuario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rol } from '../../models/Roles/rol.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  jsonResponse?:JsonResponse;
  usuarios?:Usuario[];  
  nuevoUsuario?:Usuario;
  message?:String;
  guardarUser?: Usuario;

  id?:number;
  nombres?: string;
  apellidos?: string;
  username?: string;
  estado?: string = "a";
  passwordUser?: string;
  rol?: number;  

  constructor(private router: Router, private usuarioservice: UsuarioService){

  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuarioservice.getUsuarios().subscribe(
      (response: JsonResponse) => {
        this.jsonResponse = response;
        if (this.jsonResponse?.status == '000') {
          this.usuarios = this.jsonResponse?.data
          this.router.navigate(['adminUsuarios']);
        }
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  saveUser(){
    if (this.id != undefined) {
      this.guardarUser = new Usuario(this.id, this.nombres, this.apellidos, this.username, this.estado, this.passwordUser, new Rol(this.rol, undefined));
    }
    else{
      this.guardarUser = new Usuario(undefined, this.nombres, this.apellidos, this.username, this.estado, this.passwordUser, new Rol(this.rol, undefined));
    }
    
    this.usuarioservice.saveOrUpdateUs(this.guardarUser).subscribe((response?:JsonResponse) =>{
      this.jsonResponse = response;
      this.limpiarData();
      this.obtenerUsuarios();
    });
  }

  activate(id?: number){
    this.guardarUser = new Usuario(id, undefined, undefined, undefined, undefined, undefined, undefined);
  
    this.usuarioservice.activateUser(this.guardarUser).subscribe((response:JsonResponse)=>{
      this.limpiarData();
      this.obtenerUsuarios();
    });  
  }
  desactivate(id?: number){
    this.guardarUser = new Usuario(id, undefined, undefined, undefined, undefined, undefined, undefined);

    this.usuarioservice.deactivateUser(this.guardarUser).subscribe((response:JsonResponse)=>{
      this.limpiarData();
      this.obtenerUsuarios();
    });
  }

  cargarData(obId?:number, obNombres?: string, obApellidos?: string, obUsername?: string, obPasswordUser?: string, obRol?:number){
    this.limpiarData();

    this.id = obId;
    this.nombres = obNombres;
    this.apellidos = obApellidos;
    this.username = obUsername;
    this.passwordUser = obPasswordUser;
    this.rol = obRol;
  }

  limpiarData(){
    this.id = undefined;
    this.nombres = undefined;
    this.apellidos = undefined;
    this.username = undefined;
    this.passwordUser = undefined;
    this.rol = undefined;
  }
}
