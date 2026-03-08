// Componente standalone para tela Home
import { Component } from '@angular/core';
import { parseJwt } from '../../jwt.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { HeaderInterface } from '../../shared/models/header';

/**
 * HomeComponent: exibe informações do usuário autenticado via JWT.
 * Segue melhores práticas Angular 21.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username = '';
  role = '';
  userLogged!: HeaderInterface;

  constructor() {
    const token = localStorage.getItem('jwt');
    this.userLogged = token ? parseJwt(token) : null;


    console.log('parseJwt info:', this.userLogged);

  }

  logout() {
    localStorage.removeItem('jwt');
    window.location.href = '/';
  }
}
