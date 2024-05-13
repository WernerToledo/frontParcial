import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Libro } from '../../models/Libro/libro.model';



@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private http:HttpClient) { }

  SaveLibro(oLibro?:Libro){
    return this.http.post<any>('http://localhost:8080/api/libro', oLibro);
  }

  getLibros() {
    return this.http.get<JsonResponse>('http://localhost:8080/api/libro');
  } 

  getLibrosActtivos(){
    return this.http.get<JsonResponse>('http://localhost:8080/api/libro/activos');
  }

  deactivateBook(id?:number){
    return this.http.delete<any>(`http://localhost:8080/api/libro/deactivate/${id}`);
  }
  activateBook(id?:number){
    return this.http.delete<any>(`http://localhost:8080/api/libro/activate/${id}`);
  }
}
