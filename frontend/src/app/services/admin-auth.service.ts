import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {

  private TOKEN_KEY = 'ADMIN_TOKEN';

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) === 'supersecret123';
  }
}
