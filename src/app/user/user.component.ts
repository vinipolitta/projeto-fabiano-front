// Componente standalone para CRUD de usuários
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

/**
 * UserComponent: gerenciamento de usuários (CRUD).
 * Usa Reactive Forms, signals para estado e integra com ApiService.
 * Segue melhores práticas Angular 21.
 */
@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  /** Lista de usuários */
  users = signal<any[]>([]);
  /** Mensagem de erro */
  error = signal<string | null>(null);
  /** Formulário reativo para usuário */
  form: FormGroup;
  /** ID do usuário em edição */
  editingId: string | null = null;

  /** Serviço de integração com backend */
  private api = new ApiService();
  /** Builder para formulários reativos */
  private fb = new FormBuilder();

  constructor() {
    // Inicializa o formulário
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      role: [''],
      password: ['', Validators.required]
    });
    // Carrega usuários ao iniciar
    this.loadUsers();
  }

  /** Carrega lista de usuários */
  async loadUsers() {
    try {
      this.users.set(await this.api.getUsers());
      this.error.set(null);
    } catch (e) {
      this.error.set('Erro ao carregar usuários');
    }
  }

  /** Seleciona usuário para edição */
  editUser(user: any) {
    this.editingId = user.id;
    this.form.patchValue({
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      password: '' // Nunca exibe senha
    });
  }

  /** Prepara formulário para novo usuário */
  newUser() {
    this.editingId = null;
    this.form.reset();
  }

  /** Salva usuário (cria ou edita) */
  async saveUser() {
    if (!this.form.valid) return;
    const user = this.form.value;
    try {
      if (this.editingId) {
        await this.api.updateUser(this.editingId, user);
      } else {
        await this.api.createUser(user);
      }
      this.newUser();
      this.loadUsers();
    } catch (e) {
      this.error.set('Erro ao salvar usuário');
    }
  }

  /** Exclui usuário */
  async deleteUser(id: string) {
    try {
      await this.api.deleteUser(id);
      this.loadUsers();
    } catch (e) {
      this.error.set('Erro ao excluir usuário');
    }
  }
}
