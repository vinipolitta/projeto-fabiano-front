import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface UserPayload {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  private apiUrl = 'http://localhost:8080/users';

  user = signal<UserPayload | null>(null);

  getUsers(page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(this.apiUrl, { params });
  }

  loadUserFromToken() {
    const token = localStorage.getItem('jwt');

    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));

    this.user.set({
      username: payload.sub,
      role: payload.role,
    });

    console.log('[SERVICE USER]', this.user);
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

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
