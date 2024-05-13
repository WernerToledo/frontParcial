import { Component } from '@angular/core';
import { EncrypServiceService } from '../Encryp/encryp-service.service';
import { FormsModule } from '@angular/forms';
import { JsonResponse } from '../models/Response/json-response.model';
import { Usuario } from '../models/usuario/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username?: String;
  password?: String;
  jsonResponse?:JsonResponse;
  usuario:Usuario|undefined;
  message?:String;

  constructor(private router: Router, private encryptionService: EncrypServiceService, private UserService:UsuarioService){

  }

  Login(){
    this.UserService.LoginCredential(this.username, this.password).subscribe(
      (response: JsonResponse)=>{
        this.jsonResponse = response;
        console.log(this.jsonResponse);
        if (this.jsonResponse?.status == '000') {
          this.usuario = this.jsonResponse.data;
          const encrypData = this.encryptionService.encryptAndSaveData(this.usuario);
          //para el usuario la sesion se guardara como credential
          sessionStorage.setItem('credential', encrypData);
          this.router.navigate(['']);
        }
        else{
          this.message = this.jsonResponse.message;
        }
      }
    );
  }

  // guardarData(){
  //   const usuarioData = { nombre: this.username};
  //   console.log(usuarioData);
  //   const datoEncryp= this.encryptionService.encryptAndSaveData(usuarioData);
  //   sessionStorage.setItem('usuarioData', datoEncryp);
  // }

  ObtenerData(){
    const usuario = this.encryptionService.decryptAndGetData('credential');
    console.log(usuario);
  }

  registrarse(){
    this.router.navigate(['registrar']);
  }
}
