// Serviço para integração com backend (auth e users)
import { signal, inject } from '@angular/core';

export class ApiService {
  private baseUrl = 'http://localhost:8080';
  private jwt = signal<string | null>(null);

  // Armazena o JWT recebido
  setToken(token: string) {
    this.jwt.set(token);
  }

  // Registro de usuário
  async register(payload: {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }): Promise<any> {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  // Login
  async login(payload: { username: string; password: string }): Promise<any> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.token) this.setToken(data.token);
    return data;
  }

  // CRUD de usuários
  async getUsers(): Promise<any[]> {
    const res = await fetch(`${this.baseUrl}/users`, {
      headers: this.authHeaders()
    });
    return res.json();
  }

  async createUser(payload: any): Promise<any> {
    const res = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  async updateUser(id: string, payload: any): Promise<any> {
    const res = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'PUT',
      headers: this.authHeaders(),
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  async deleteUser(id: string): Promise<any> {
    const res = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'DELETE',
      headers: this.authHeaders()
    });
    return res.json();
  }

  // Headers com JWT
  private authHeaders() {
    const token = this.jwt();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }
}
