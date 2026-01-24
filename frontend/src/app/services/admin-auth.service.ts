import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private readonly SESSION_KEY = 'ADMIN_SESSION';
  private readonly ADMIN_PASSWORD = 'supersecret123';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /** 🔐 LOGIN */
  login(password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    if (password !== this.ADMIN_PASSWORD) {
      return false;
    }

    const expiresAt = Date.now() + (30 * 60 * 1000); // 30 minutes

    localStorage.setItem(
      this.SESSION_KEY,
      JSON.stringify({
        token: this.ADMIN_PASSWORD,
        expiresAt
      })
    );

    return true;
  }

  /** ✅ AUTH CHECK */
  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const raw = localStorage.getItem(this.SESSION_KEY);
    if (!raw) return false;

    try {
      const session = JSON.parse(raw);

      if (session.token !== this.ADMIN_PASSWORD) return false;

      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  /** 🚪 LOGOUT */
  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(this.SESSION_KEY);
  }
}
