import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

    password = '';
    error = false;

    // MUST match AdminAuthGuard + backend env
    private ADMIN_PASSWORD = 'supersecret123';

    constructor(private router: Router) {
        if (localStorage.getItem('ADMIN_TOKEN') === this.ADMIN_PASSWORD) {
            this.router.navigate(['/admin/update']);
        }
    }

    login(): void {
        if (this.password === this.ADMIN_PASSWORD) {
            localStorage.setItem('ADMIN_TOKEN', this.ADMIN_PASSWORD);
            this.router.navigate(['/admin/update']);
        } else {
            this.error = true;
        }
    }
}
