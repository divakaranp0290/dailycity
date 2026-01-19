import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminStateService } from '../services/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit, OnDestroy {

  cities: string[] = [];
  private sub!: Subscription;

  city = 'chennai';
  date = new Date().toISOString().split('T')[0];

  today_special = '';
  traffic: string | null = null;
  power_cut: boolean | null = null;
  water_issue: boolean | null = null;

  sunrise = '';
  sunset = '';
  tithi = '';
  rahu_kalam = '';
  yamagandam = '';

  petrol: number | null = null;
  diesel: number | null = null;
  gold_22k: number | null = null;
  silver: number | null = null;

  loading = false;
  success = false;
  error = false;

  private API = 'https://dailycity.onrender.com/api';
  private ADMIN_TOKEN = 'supersecret123';

  constructor(
    private http: HttpClient,
    private adminAuth: AdminAuthService,
    private adminState: AdminStateService
  ) {}

  ngOnInit(): void {
    this.loadCities();

    this.sub = this.adminState.city$.subscribe(city => {
      this.city = city;
      this.resetFormFields();
      this.autoFillTodayData();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadCities(): void {
    const headers = new HttpHeaders({ 'x-admin-token': this.ADMIN_TOKEN });

    this.http.get<string[]>(`${this.API}/admin/cities`, { headers })
      .subscribe({
        next: (data) => {
          this.cities = data;
          if (data.length) {
            this.city = data[0];
            this.autoFillTodayData();
          }
        },
        error: () => this.cities = []
      });
  }

  copyYesterday(): void {
    const headers = new HttpHeaders({ 'x-admin-token': this.ADMIN_TOKEN });

    this.http.get<any>(`${this.API}/admin/copy-yesterday/${this.city}`, { headers })
      .subscribe(res => {
        if (!res) return alert('No data found');

        Object.assign(this, {
          today_special: res.today_special ?? '',
          traffic: res.traffic ?? null,
          power_cut: res.power_cut ?? null,
          water_issue: res.water_issue ?? null,
          petrol: res.petrol ?? null,
          diesel: res.diesel ?? null,
          gold_22k: res.gold_22k ?? null,
          silver: res.silver ?? null,
          sunrise: res.sunrise ?? '',
          sunset: res.sunset ?? '',
          tithi: res.tithi ?? '',
          rahu_kalam: res.rahu_kalam ?? '',
          yamagandam: res.yamagandam ?? ''
        });
      });
  }

  resetFormFields(): void {
    this.today_special = '';
    this.traffic = null;
    this.power_cut = null;
    this.water_issue = null;
    this.petrol = null;
    this.diesel = null;
    this.gold_22k = null;
    this.silver = null;
    this.sunrise = '';
    this.sunset = '';
    this.tithi = '';
    this.rahu_kalam = '';
    this.yamagandam = '';
  }

  autoFillTodayData(): void {
    this.http.get<any>(`${this.API}/${this.city}/today`)
      .subscribe(res => {
        if (!res) return;
        Object.assign(this, res);
      });
  }

  submit(form: any): void {
    if (form.invalid) return;

    this.loading = true;
    this.success = false;
    this.error = false;

    const payload = {
      city: this.city,
      date: this.date,
      today_special: this.today_special || null,
      traffic: this.traffic,
      power_cut: this.power_cut,
      water_issue: this.water_issue,
      petrol: this.petrol,
      diesel: this.diesel,
      gold_22k: this.gold_22k,
      silver: this.silver,
      sunrise: this.sunrise || null,
      sunset: this.sunset || null,
      tithi: this.tithi || null,
      rahu_kalam: this.rahu_kalam || null,
      yamagandam: this.yamagandam || null
    };

    const headers = new HttpHeaders({ 'x-admin-token': this.ADMIN_TOKEN });

    this.http.post(`${this.API}/admin/update`, payload, { headers })
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

  logout(): void {
    this.adminAuth.logout();
  }
}
