// Interceptor para adicionar JWT e extrair username/role
import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Recupera o token do localStorage ou serviço
  const token = localStorage.getItem('jwt');
  let cloned = req;
  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(cloned);
};

// Função para extrair username e role do JWT
export function parseJwt(token: string): any | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}
