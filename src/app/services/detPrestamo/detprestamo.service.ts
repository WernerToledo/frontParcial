import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonResponse } from '../../models/Response/json-response.model';
import { Detprestamo } from '../../models/detprestamos/detprestamo.model';

@Injectable({
  providedIn: 'root'
})
export class DetprestamoService {

  constructor(private http:HttpClient) { }

  getDetPrestamo(id?:number){
    return this.http.get<JsonResponse>(`http://localhost:8080/api/v1/Detalles/${id}`);
  }

  saveDetPrestamo(body?:Detprestamo){
    console.log(body);
    
    return this.http.post<any>('http://localhost:8080/api/v1/Detalles', body);
  }

  devolverLibro(id?:number){
    return this.http.get<any>(`http://localhost:8080/api/v1/Detalles/update/${id}`);
  }
}

