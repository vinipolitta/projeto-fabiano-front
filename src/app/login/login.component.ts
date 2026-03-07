// Componente standalone para tela de login
import { Component, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * LoginComponent: tela de login com JWT.
 * Segue melhores práticas Angular 21.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class LoginComponent {
  error = signal<string | null>(null);
  form: FormGroup;
  private api = new ApiService();
  private fb = new FormBuilder();

  constructor(private route: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (!this.form.valid) return;
    const { username, password } = this.form.value;
    const result = await this.api.login({ username, password });
    if (!result.token) {
      this.error.set('Usuário ou senha inválidos');
    } else {
      this.error.set(null);
      localStorage.setItem('jwt', result.token);
      window.location.href = '/home';
    }
  }

  redirectToAddNewUser() {
    this.route.navigate(['/register']);
  }
}
