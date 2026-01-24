import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  password = '';
  error = false;
  loading = false;

  constructor(
    private router: Router,
    private auth: AdminAuthService
  ) {}

  login(): void {
    if (!this.password || this.loading) {
      return;
    }

    this.loading = true;
    this.error = false;

    const success = this.auth.login(this.password);

    if (success) {
      this.router.navigate(['/admin/update']);
    } else {
      this.error = true;
    }

    this.loading = false;
  }
}
