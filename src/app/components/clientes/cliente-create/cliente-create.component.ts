import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../service/client/cliente.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ClienteCreateComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      notes: [''],
    });
  }

  saveClient() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.clientService.create(this.clientForm.value).subscribe({
      next: () => {
        alert('Cliente criado com sucesso!');
        this.clientForm.reset();
        this.router.navigateByUrl('/home');
      },
      error: () => {
        alert('Erro ao criar cliente');
      },
    });
  }

  redirectToListClient() {
    this.router.navigate(['/home']);
  }
}
