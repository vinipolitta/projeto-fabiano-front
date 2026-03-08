import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user/user.service';

/**
 * Interface para representar cada link do menu
 */
interface NavLink {
  label: string;       // Texto que aparece no menu
  path: string;        // Rota Angular
  roles: string[];     // Roles que podem acessar este link
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink], // 🔹 necessário para [routerLink]
})
export class HeaderComponent implements OnInit {
  /** Lista de links do menu */
  navLinks: NavLink[] = [];

  /** Roles do usuário atual, sempre como array */
  userRoles: string[] = [];

  constructor(
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    // 🔥 Carrega usuário do JWT
    this.userService.loadUserFromToken();

    // Transforma role em array, mesmo que venha como string única
    const role = this.userService.user()?.role;
    this.userRoles = role ? (Array.isArray(role) ? role : [role]) : [];

    // Inicializa links de navegação
    this.navLinks = [
      { label: 'Home', path: '/home', roles: ['ROLE_ADMIN', 'ROLE_CLIENT'] },
      { label: 'Usuários', path: '/users', roles: ['ROLE_ADMIN'] },
      { label: 'Criar Template', path: '/create-template', roles: ['ROLE_ADMIN'] },
      { label: 'Meus Templates', path: '/client-templates', roles: ['ROLE_CLIENT', 'ROLE_ADMIN'] },
      { label: 'Meus Cadastros do template', path: '/list-templates', roles: ['ROLE_CLIENT', 'ROLE_ADMIN'] },
      { label: 'Clientes Criados', path: '/clients-list', roles: ['ROLE_ADMIN'] },
    ];

    console.log('HEADER USER', this.userService.user());
  }

  /**
   * Logout do usuário
   */
  logout(): void {
    this.userService.logout(); // 🔹 melhor usar logout centralizado
    this.router.navigate(['/']);
  }

  /**
   * Retorna apenas os links visíveis para o usuário atual
   */
  get visibleLinks(): NavLink[] {
    return this.navLinks.filter(link => this.canShow(link.roles));
  }

  /**
   * Verifica se o usuário pode ver um determinado link
   * @param allowedRoles Roles permitidas para o link
   */
  canShow(allowedRoles: string[]): boolean {
    // Admin vê todos os links
    if (this.userRoles.includes('ROLE_ADMIN')) return true;

    // Verifica se alguma role do usuário bate com as permitidas
    return this.userRoles.some(role => allowedRoles.includes(role));
  }
}