import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface UserPayload {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  user = signal<UserPayload | null>(null);

  loadUserFromToken() {
    const token = localStorage.getItem('jwt');

    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));

    this.user.set({
      username: payload.sub,
      role: payload.role,
    });

    console.log("[SERVICE USER]",this.user);
    
  }

  getUsername(): string | null {
    return this.user()?.username ?? null;
  }

  getRole(): string | null {
    return this.user()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  logout() {
    localStorage.removeItem('jwt');
    this.user.set(null);
    this.router.navigate(['/']);
  }
}
