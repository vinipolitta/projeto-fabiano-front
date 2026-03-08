import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('projeto-fabiano-front');
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUserFromToken();
    console.log("[APP TS]", this.userService.getRole());

  }
}
