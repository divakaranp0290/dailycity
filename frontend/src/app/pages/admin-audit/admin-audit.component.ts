import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-audit',
  templateUrl: './admin-audit.component.html',
  styleUrls: ['./admin-audit.component.css']
})
export class AdminAuditComponent implements OnInit {

  logs: any[] = [];
  loading = true;
  error = false;

  private API = 'https://dailycity.onrender.com/api';
  private ADMIN_TOKEN = 'supersecret123';

  constructor(private http: HttpClient,private adminAuth: AdminAuthService) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs(): void {
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http.get<any[]>(`${this.API}/admin/audit-logs`, { headers })
      .subscribe({
        next: (res) => {
          this.logs = res;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

  formatJSON(payload: any): string {
    return JSON.stringify(payload, null, 2);
  }

  logout(): void {
  this.adminAuth.logout();
}
}
