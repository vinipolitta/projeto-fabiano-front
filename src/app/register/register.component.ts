// Componente standalone para tela de cadastro
import { Component, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * RegisterComponent: tela de cadastro de usuário.
 * Segue melhores práticas Angular 21.
 */
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  error = signal<string | null>(null);
  success = signal<string | null>(null);
  private api = new ApiService();
  private fb = new FormBuilder();

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  async onRegister() {
    if (!this.form.valid) return;
    const payload = this.form.value;
    const result = await this.api.register(payload);
    if (result.error) {
      this.error.set(result.error);
      this.success.set(null);
    } else {
      this.error.set(null);
      this.success.set('Usuário cadastrado com sucesso!');
      this.form.reset();
    }
  }

  redirectToLogin(): void {
    window.location.href = '/';
  }
}
