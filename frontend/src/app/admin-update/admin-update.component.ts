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

  power_cut = false;
  water_issue = false;
  traffic = 'moderate';

  petrol!: number;
  diesel!: number;
  gold_22k!: number;
  silver!: number;

  success = false;
  error = false;
  loading = false;

  constructor(private adminService: AdminService) {}

  submit() {
    this.loading = true;
    this.success = false;
    this.error = false;

    const payload = {
      city: this.city.toLowerCase().trim(),
      date: this.date,
      power_cut: this.power_cut,
      water_issue: this.water_issue,
      traffic: this.traffic,
      petrol: this.petrol,
      diesel: this.diesel,
      gold_22k: this.gold_22k,
      silver: this.silver
    };

    this.adminService.updateCityToday(payload).subscribe({
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
