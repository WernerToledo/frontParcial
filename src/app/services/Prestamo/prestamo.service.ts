import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prestamo } from '../../models/prestamos/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http:HttpClient) { }
  
  savePrestamo(body:Prestamo){
    return this.http.post<any>('http://localhost:8080/api/v1/Prestamos', body);
  }

  getLibrosStock(){
    return this.http.get<any>('http://localhost:8080/api/v1/Prestamos/librostock');
  }

  deletePrestamo(id?: number){
    return this.http.delete<any>(`http://localhost:8080/api/v1/Prestamos/${id}`);
  }
}
