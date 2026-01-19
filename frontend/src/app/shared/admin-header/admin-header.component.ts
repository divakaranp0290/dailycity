import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminStateService } from '../../services/admin-state.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  cities: string[] = [];
  selectedCity = '';

  private API = 'https://dailycity.onrender.com/api';
  private ADMIN_TOKEN = 'supersecret123';

  constructor(
    private http: HttpClient,
    private auth: AdminAuthService,
    private adminState: AdminStateService
  ) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http.get<string[]>(`${this.API}/admin/cities`, { headers })
      .subscribe({
        next: (res) => {
          this.cities = res;
          if (res.length) {
            this.selectedCity = res[0];
            this.adminState.setCity(this.selectedCity);
          }
        }
      });
  }

  onCityChange(): void {
    this.adminState.setCity(this.selectedCity);
  }

  logout(): void {
    this.auth.logout();
  }
}
