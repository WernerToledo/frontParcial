import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Categoria } from '../../models/categorias/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  getCategorias(){
    return this.http.get<JsonResponse>('http://localhost:8080/api/categoria'); 
  }

  getCategoriasActivas(){
    return this.http.get<JsonResponse>('http://localhost:8080/api/categoria/activas'); 
  }

  SaveCategoria(body?: Categoria){
    return this.http.post<JsonResponse>('http://localhost:8080/api/categoria', body);
  }

  ActivateCategoria(body?: Categoria){
    return this.http.post<JsonResponse>('http://localhost:8080/api/categoria/activate', body);
  }

  DesactivateCategoria(body?: Categoria){
    return this.http.post<JsonResponse>('http://localhost:8080/api/categoria/deactivate', body);
  }
}
