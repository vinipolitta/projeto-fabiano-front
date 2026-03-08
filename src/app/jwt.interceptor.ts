// jwt.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interceptor JWT correto para Angular 20 (standalone API)
export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const token = localStorage.getItem('jwt');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned); // chama a próxima função
  }

  return next(req); // segue sem token
};

// Interface do payload do JWT
export interface JwtPayload {
  sub: string; // username
  role: string; // ou roles: string[]
  iat?: number;
  exp?: number;
}

// Função para extrair username e role do JWT
export function parseJwt(token: string): JwtPayload | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (e) {
    console.error('Erro ao decodificar JWT:', e);
    return null;
  }
}