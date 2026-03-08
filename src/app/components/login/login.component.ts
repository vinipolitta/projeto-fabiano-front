import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  async onSubmit() {

    if (!this.form.valid) return;

    const { username, password } = this.form.value;

    const result = await this.authService.login({ username, password });

    if (!result.token) {

      this.error.set('Usuário ou senha inválidos');

      return;
    }

    // carrega usuário do JWT
    this.userService.loadUserFromToken();

    this.router.navigate(['/home']);

  }

    redirectToAddNewUser() {
    this.router.navigate(['/register']);
  }

}
