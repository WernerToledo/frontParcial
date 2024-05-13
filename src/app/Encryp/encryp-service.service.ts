import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrypServiceService {
  private secretKey ='123'; 

  constructor() { }

  // Encripta un objeto JSON y lo guarda en el localStorage
  encryptAndSaveData(data: any): any {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    return encryptedData;
  }

  // Obtiene un objeto JSON del localStorage y lo desencripta
  decryptAndGetData(key: string): any {
    const encryptedData = sessionStorage.getItem(key);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      
      return decryptedData;
    }
    return null;
  }

  // Elimina un objeto JSON del localStorage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  // Elimina todos los datos del localStorage
  clearStorage(): void {
    localStorage.clear();
  }
}
