import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Usuario } from '../../models/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  LoginCredential(username?:String, password?:String){
    const body = { 
                    username: username, 
                    password: password 
                  };
    return this.http.post<any>('http://localhost:8080/api/user', body);
  }
  saveOrUpdateUs(body?:Usuario){
    return this.http.post<any>('http://localhost:8080/api/user/save', body);
  }


  getUsuarios(){
    return this.http.get<JsonResponse>('http://localhost:8080/api/user');
  }

  activateUser(body?: Usuario){
    return this.http.post<any>('http://localhost:8080/api/user/activate', body);
  }

  deactivateUser(body?: Usuario){
    return this.http.post<any>('http://localhost:8080/api/user/deactivate', body);
  }
  
}
