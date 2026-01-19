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

  /** 🔹 CITY LIST */
  cities: string[] = [];
  private sub!: Subscription;

  city = 'chennai';
  date = new Date().toISOString().split('T')[0];

  /** 🔹 CITY CONTENT */
  today_special = '';
  traffic: string | null = null;
  power_cut: boolean | null = null;
  water_issue: boolean | null = null;

  /** 🔹 PANCHANG */
  sunrise = '';
  sunset = '';
  tithi = '';
  rahu_kalam = '';
  yamagandam = '';

  /** 🔹 FINANCE */
  petrol: number | null = null;
  gold_22k: number | null = null;
  silver: number | null = null;
  /** 🔹 UI STATE */
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

  /** 🔹 Load cities for dropdown */
  loadCities(): void {
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http.get<string[]>(`${this.API}/admin/cities`, { headers })
      .subscribe({
        next: (data) => {
          this.cities = data;
          if (data.length) {
            this.city = data[0];
            this.autoFillTodayData();
          }
        },
        error: () => {
          this.cities = [];
        }
      });
  }

  /** 🔹 Copy yesterday’s data */
  copyYesterday(): void {
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http
      .get<any>(`${this.API}/admin/copy-yesterday/${this.city}`, { headers })
      .subscribe({
        next: (res) => {
          if (!res) {
            alert('No data found for yesterday');
            return;
          }

          this.today_special = res.today_special ?? '';
          this.traffic = res.traffic ?? null;
          this.power_cut = res.power_cut ?? null;
          this.water_issue = res.water_issue ?? null;

          this.petrol = res.petrol ?? null;
          this.gold_22k = res.gold_22k ?? null;
          this.silver = res.silver ?? null;

          this.sunrise = res.sunrise ?? '';
          this.sunset = res.sunset ?? '';
          this.tithi = res.tithi ?? '';
          this.rahu_kalam = res.rahu_kalam ?? '';
          this.yamagandam = res.yamagandam ?? '';
        },
        error: () => {
          alert('Failed to copy yesterday data');
        }
      });
  }

  /** 🔹 Clear old values */
  resetFormFields(): void {
    this.today_special = '';
    this.traffic = null;
    this.power_cut = null;
    this.water_issue = null;

    this.petrol = null;
    this.gold_22k = null;
    this.silver = null;
    this.sunrise = '';
    this.sunset = '';
    this.tithi = '';
    this.rahu_kalam = '';
    this.yamagandam = '';
  }

  /** 🔹 Fetch today’s data */
  autoFillTodayData(): void {
    this.http.get<any>(`${this.API}/${this.city}/today`).subscribe({
      next: (res) => {
        if (!res) return;

        this.today_special = res.today_special ?? '';
        this.traffic = res.traffic ?? null;
        this.power_cut = res.power_cut ?? null;
        this.water_issue = res.water_issue ?? null;
        this.silver = res.silver ?? null;

        this.petrol = res.petrol ?? null;
        this.gold_22k = res.gold_22k ?? null;

        this.sunrise = res.sunrise ?? '';
        this.sunset = res.sunset ?? '';
        this.tithi = res.tithi ?? '';
        this.rahu_kalam = res.rahu_kalam ?? '';
        this.yamagandam = res.yamagandam ?? '';
      },
      error: () => {
        // silent fail (SEO-safe)
      }
    });
  }

  /** 🔹 Submit admin update */
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
      gold_22k: this.gold_22k,
      silver:this.silver,

      sunrise: this.sunrise || null,
      sunset: this.sunset || null,
      tithi: this.tithi || null,
      rahu_kalam: this.rahu_kalam || null,
      yamagandam: this.yamagandam || null
    };

    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

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
