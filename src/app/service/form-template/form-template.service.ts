import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormField {
  label: string;
  type: string;
  required: boolean;
}

export interface FormTemplateRequest {
  name: string;
  fields: FormField[];
}

export interface FormTemplate {
  id: number;
  name: string;
  clientId: number;
  fields: FormField[];
}

export interface FormSubmissionRequest {
  templateId: number;          // ⚡ chama "templateId" igual backend
  values: { [key: string]: string };  // ⚡ chama "values" igual backend
}

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Admin: criar template
  createTemplate(clientId: number, template: FormTemplateRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/form-templates/create/${clientId}`, template);
  }

  // Cliente: buscar templates disponíveis
  getTemplatesByClient(clientId: number): Observable<FormTemplate[]> {
    return this.http.get<FormTemplate[]>(`${this.apiUrl}/form-templates/my-templates`);
  }
  getTemplatesByAdmin(clientId: number): Observable<FormTemplate[]> {
    return this.http.get<FormTemplate[]>(`${this.apiUrl}/form-templates`);
  }

  // Cliente: enviar submissão
submitForm(payload: FormSubmissionRequest): Observable<any> {
  console.log("Payload enviado ao backend:", payload);

  return this.http.post(`${this.apiUrl}/form-submissions`, payload);
}

  // Admin: buscar todos os clientes
  getClients(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.apiUrl}/users/clients`);
  }
}