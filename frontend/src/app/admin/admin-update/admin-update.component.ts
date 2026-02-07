import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminStateService } from '../../services/admin-state.service';
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

  // IST Date
  date = new Date().toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata'
  });

  today_special = '';
  traffic = '';
  power_cut = '';
  water_issue = '';

  petrol: number | null = null;
  diesel: number | null = null;
  gold_22k: number | null = null;
  silver: number | null = null;

  sunrise = '';
  sunset = '';
  tithi = '';
  rahu_kalam = '';
  yamagandam = '';

  loading = false;
  success = false;
  error = false;

  private API = 'https://dailycity.onrender.com/api';
  // For Local Development
  // private API = 'http://localhost:3000/api';
  private ADMIN_TOKEN = 'supersecret123';

  constructor(
    private http: HttpClient,
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
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http.get<string[]>(`${this.API}/admin/cities`, { headers })
      .subscribe(data => {
        this.cities = data;
        if (data.length) {
          this.city = data[0];
          this.autoFillTodayData();
        }
      });
  }

  resetFormFields(): void {
    this.today_special = '';
    this.traffic = '';
    this.power_cut = '';
    this.water_issue = '';

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
    this.http.get<any>(`${this.API}/${this.city}/today`).subscribe(res => {
      if (!res) return;

      this.today_special = res.today_special ?? '';
      this.traffic = res.traffic ?? '';
      this.power_cut = res.power_cut ?? '';
      this.water_issue = res.water_issue ?? '';

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

  copyYesterday(): void {
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http.get<any>(`${this.API}/admin/copy-yesterday/${this.city}`, { headers })
      .subscribe(res => {
        if (!res) return;

        this.today_special = res.today_special ?? '';
        this.traffic = res.traffic ?? '';
        this.power_cut = res.power_cut ?? '';
        this.water_issue = res.water_issue ?? '';

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

  submit(form: any): void {
    if (form.invalid) return;

    this.loading = true;
    this.success = false;
    this.error = false;

    const payload = {
      city: this.city,
      date: this.date,

      today_special: this.today_special || null,
      traffic: this.traffic || null,
      power_cut: this.power_cut || null,
      water_issue: this.water_issue || null,

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

    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    this.http.post(`${this.API}/admin/update`, payload, { headers })
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = true;
          this.autoFillTodayData();
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
  }
}
