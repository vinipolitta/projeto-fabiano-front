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

  constructor(
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {

    // 🔥 carrega usuário do JWT
    this.userService.loadUserFromToken();

    console.log("HEADER USER", this.userService.user());
  }

  logout() {

    localStorage.clear();

    this.router.navigate(['/login']);
  }

}
