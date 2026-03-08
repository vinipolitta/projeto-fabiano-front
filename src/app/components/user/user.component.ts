import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user/user.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users = signal<any[]>([]);
  error = signal<string | null>(null);
  form: FormGroup;
  editingId: string | null = null;

  constructor(
    private userService: UserService, // ✅ injeta o service
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      role: [''],
      password: ['', Validators.required]
    });

    this.loadUsers();
  }

  /** Carrega usuários via service */
  async loadUsers() {
    try {
      const data = await firstValueFrom(this.userService.getUsers(0, 10)); // converte Observable em Promise
      this.users.set(data.content ?? data); // ajusta dependendo do retorno do backend
      this.error.set(null);
    } catch (e) {
      console.error(e);
      this.error.set('Erro ao carregar usuários');
    }
  }

  editUser(user: any) {
    this.editingId = user.id;
    this.form.patchValue({
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      password: ''
    });
  }

  newUser() {
    this.editingId = null;
    this.form.reset();
  }

  async saveUser() {
    if (!this.form.valid) return;
    const user = this.form.value;
    try {
      // if (this.editingId) {
      //   await firstValueFrom(this.userService.updateUser(this.editingId, user));
      // } else {
      //   await firstValueFrom(this.userService.createUser(user));
      // }
      this.newUser();
      this.loadUsers();
    } catch (e) {
      console.error(e);
      this.error.set('Erro ao salvar usuário');
    }
  }

  async deleteUser(id: number) {
    try {
      await firstValueFrom(this.userService.deleteUser(id));
      this.loadUsers();
    } catch (e) {
      console.error(e);
      this.error.set('Erro ao excluir usuário');
    }
  }

  voltarToHome() {
    this.router.navigate(['/home']);
  }
}