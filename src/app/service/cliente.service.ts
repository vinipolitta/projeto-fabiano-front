import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private api = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}

  create(client: any) {
    return this.http.post(this.api, client);
  }

}
