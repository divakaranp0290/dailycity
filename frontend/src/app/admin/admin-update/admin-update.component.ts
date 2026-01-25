import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminStateService } from '../../services/admin-state.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit, OnDestroy {

  /* ===============================
     BASIC STATE
  ================================ */
  cities: string[] = [];
  private sub!: Subscription;

  city = 'chennai';

  // ✅ IST DATE (CRITICAL FIX)
  date = new Date().toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata'
  });

  /* ===============================
     CITY DATA
  ================================ */
  today_special = '';
  traffic: string | null = null;
  power_cut: boolean | null = null;
  water_issue: boolean | null = null;

  petrol: number | null = null;
  diesel: number | null = null;
  gold_22k: number | null = null;
  silver: number | null = null;

  sunrise = '';
  sunset = '';
  tithi = '';
  rahu_kalam = '';
  yamagandam = '';

  /* ===============================
     UI FLAGS
  ================================ */
  loading = false;
  success = false;
  error = false;

  /* ===============================
     API CONFIG
  ================================ */
  private API = 'https://dailycity.onrender.com/api';
  private ADMIN_TOKEN = 'supersecret123';

  constructor(
    private http: HttpClient,
    private auth: AdminAuthService,
    private adminState: AdminStateService,
    private router: Router
  ) {}

  /* ===============================
     LIFECYCLE
  ================================ */
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

  /* ===============================
     LOAD CITIES
  ================================ */
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

  /* ===============================
     COPY YESTERDAY
  ================================ */
  copyYesterday(): void {
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http.get<any>(`${this.API}/admin/copy-yesterday/${this.city}`, { headers })
      .subscribe(res => {
        if (!res) {
          alert('No data found for yesterday');
          return;
        }

        this.today_special = res.today_special ?? '';
        this.traffic = res.traffic ?? null;
        this.power_cut = res.power_cut ?? null;
        this.water_issue = res.water_issue ?? null;

        this.petrol = res.petrol ?? null;
        this.diesel = res.diesel ?? null;
        this.gold_22k = res.gold_22k ?? null;
        this.silver = res.silver ?? null;

        this.sunrise = res.sunrise ?? '';
        this.sunset = res.sunset ?? '';
        this.tithi = res.tithi ?? '';
        this.rahu_kalam = res.rahu_kalam ?? '';
        this.yamagandam = res.yamagandam ?? '';
      });
  }

  /* ===============================
     RESET FORM
  ================================ */
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

  /* ===============================
     AUTO FILL TODAY (FIXED)
  ================================ */
  autoFillTodayData(): void {
    this.http.get<any>(`${this.API}/${this.city}/today`, {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      })
    }).subscribe({
      next: (res) => {
        if (!res) return;

        this.today_special = res.today_special ?? '';
        this.traffic = res.traffic ?? null;
        this.power_cut = res.power_cut ?? null;
        this.water_issue = res.water_issue ?? null;

        this.petrol = res.petrol ?? null;
        this.diesel = res.diesel ?? null;
        this.gold_22k = res.gold_22k ?? null;
        this.silver = res.silver ?? null;

        this.sunrise = res.sunrise ?? '';
        this.sunset = res.sunset ?? '';
        this.tithi = res.tithi ?? '';
        this.rahu_kalam = res.rahu_kalam ?? '';
        this.yamagandam = res.yamagandam ?? '';
      },
      error: () => {
        console.warn('Failed to load today data');
      }
    });
  }

  /* ===============================
     SUBMIT UPDATE
  ================================ */
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

      petrol: this.petrol !== null ? Number(this.petrol) : null,
      diesel: this.diesel !== null ? Number(this.diesel) : null,
      gold_22k: this.gold_22k !== null ? Number(this.gold_22k) : null,
      silver: this.silver !== null ? Number(this.silver) : null,

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
          this.loading = false;
          this.success = true;
          this.error = false;

          // 🔥 REFRESH UI AFTER SAVE
          this.autoFillTodayData();
        },
        error: () => {
          this.loading = false;
          this.error = true;
          this.success = false;
        }
      });
  }

}
