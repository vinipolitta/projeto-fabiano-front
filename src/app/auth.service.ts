// Serviço de autenticação para login e gerenciamento de JWT
import { signal } from '@angular/core';

export class AuthService {
  // Sinal para armazenar o token JWT
  private jwt = signal<string | null>(null);

  // Sinal para status de autenticação
  isAuthenticated = signal<boolean>(false);

  // Simula requisição de login (substitua por chamada real de API)
  async login(username: string, password: string): Promise<boolean> {
    // Exemplo: resposta simulada de API
    if (username === 'admin' && password === '1234') {
      const fakeJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.jwt.token';
      this.jwt.set(fakeJwt);
      this.isAuthenticated.set(true);
      return true;
    }
    this.jwt.set(null);
    this.isAuthenticated.set(false);
    return false;
  }

  // Retorna o JWT atual
  getToken(): string | null {
    return this.jwt();
  }

  // Realiza logout
  logout(): void {
    this.jwt.set(null);
    this.isAuthenticated.set(false);
  }
}
