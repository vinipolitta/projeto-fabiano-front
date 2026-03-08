import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;

  constructor(
    private router: Router,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    // 🔥 carrega usuário do JWT
    this.userService.loadUserFromToken();
    this.isAdmin = this.userService.isAdmin();

    console.log('HEADER USER', this.userService.user());
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
