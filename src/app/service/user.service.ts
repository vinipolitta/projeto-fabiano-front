import { Injectable, signal } from '@angular/core';
import { AuthService } from '../auth.service';

interface UserPayload {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = signal<UserPayload | null>(null);


loadUserFromToken() {

  const token = localStorage.getItem('jwt');

  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));

  this.user.set({
    username: payload.sub,
    role: payload.role
  });

}

  getUsername(): string | null {
    return this.user()?.username ?? null;
  }

  getRole(): string | null {
    return this.user()?.role ?? null;
  }

}
