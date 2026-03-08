import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private api = "http://localhost:8080/clients";

  constructor(private http: HttpClient) {}

  // LISTAR
  getClients(page:number = 0, size:number = 10){
    return this.http.get<any>(`${this.api}?page=${page}&size=${size}`);
  }

  // BUSCAR POR ID
  getById(id:number){
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // CRIAR
  create(client:any){
    return this.http.post(this.api, client);
  }

  // ATUALIZAR
  update(id:number, client:any){
    return this.http.put(`${this.api}/${id}`, client);
  }

  // DELETAR
  delete(id:number){
    return this.http.delete(`${this.api}/${id}`);
  }

}
