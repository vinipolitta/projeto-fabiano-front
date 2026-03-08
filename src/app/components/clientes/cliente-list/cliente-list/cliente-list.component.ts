import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../service/client/cliente.service';
import { UserService } from '../../../../service/user/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss'],
})
export class ClienteListComponent implements OnInit {

  clients: any[] = [];
  isAdmin!: boolean;

  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.userService.loadUserFromToken();
    this.isAdmin = this.userService.isAdmin();

    console.log("IS ADMIN:", this.isAdmin);

    this.loadClients();

  }


loadClients() {
  this.clientService.getClients().subscribe({
    next: (response: any) => {
      console.log("API RESPONSE:", response);

      this.clients = response.content;

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
    }
  });
}

  deleteClient(id: number) {

    if (!confirm('Deseja deletar este cliente?')) return;

    this.clientService.delete(id).subscribe(() => {
      this.loadClients();
    });

  }

  editClient(id: number) {
    alert('Funcionalidade de edição ainda não implementada');
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

}