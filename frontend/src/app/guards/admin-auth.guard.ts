import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}
 canActivate(): boolean {

    // TEMP SIMPLE CHECK (same token you use in AdminService)
    const adminToken = localStorage.getItem('ADMIN_TOKEN');

    if (adminToken === 'supersecret123') {
      return true;
    }

    // Not authorized → redirect
    this.router.navigate(['/chennai']);
    return false;
  }
  
}
