import { Injectable } from '@angular/core';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token?: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';

  // LOGIN
  async login(payload: LoginRequest): Promise<LoginResponse> {

    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error('Erro ao fazer login');
    }

    const data: LoginResponse = await res.json();

    if (data.token) {
      localStorage.setItem('jwt', data.token);
    }

    return data;
  }

  // REGISTER
  async register(payload: RegisterRequest): Promise<any> {

    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error('Erro ao registrar usuário');
    }

    return res.json();
  }

  // LOGOUT
  logout() {
    localStorage.removeItem('jwt');
  }

  // PEGAR TOKEN
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // VERIFICAR SE ESTÁ LOGADO
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

}
