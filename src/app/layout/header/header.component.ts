import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDropdownVisible = false;
  isNotificationVisible = false;

  constructor(private authService: AuthService, private router: Router) { }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']),
    })
  }



toggleNotification(): void {
  this.isNotificationVisible = !this.isNotificationVisible;
}
}
