// Componente standalone para tela Home
import { Component } from '@angular/core';
import { parseJwt } from '../jwt.interceptor';

/**
 * HomeComponent: exibe informações do usuário autenticado via JWT.
 * Segue melhores práticas Angular 21.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username = '';
  role = '';

  constructor() {
    const token = localStorage.getItem('jwt');
    const info = token ? parseJwt(token) : null;
    this.username = info?.username || '';
    this.role = info?.role || '';

    console.log('parseJwt info:', info);
    console.log('Username:', this.username);
    console.log('Role:', this.role);

  }

  logout() {
    localStorage.removeItem('jwt');
    window.location.href = '/';
  }
}
