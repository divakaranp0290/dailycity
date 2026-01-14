import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent {

  city = 'chennai';
  date = new Date().toISOString().split('T')[0];

  today_special = '';

  petrol: number | null = null;
  diesel: number | null = null;
  gold_22k: number | null = null;
  silver: number | null = null;

  loading = false;
  success = false;
  error = false;

  constructor(private adminService: AdminService) {}

  submit(): void {
    this.loading = true;
    this.success = false;
    this.error = false;

    const payload = {
      city: this.city.toLowerCase().trim(),
      date: this.date,
      today_special: this.today_special || null,
      petrol: this.petrol,
      diesel: this.diesel,
      gold_22k: this.gold_22k,
      silver: this.silver
    };

    this.adminService.upsertCityToday(payload).subscribe({
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
}
