import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { CityDataService } from '../../services/city-data.service';

@Component({
  selector: 'app-city-today',
  templateUrl: './city-today.component.html',
  styleUrls: ['./city-today.component.css']
})
export class CityTodayComponent implements OnInit {

  city!: string;
  date!: string;

  loading = true;
  error = false;
  todaySpecial: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private cityDataService: CityDataService
  ) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city')!;

    this.date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    this.setSEO();
    this.loadTodayData();
  }

  setSEO(): void {
    const cityName = this.capitalize(this.city);

    this.seo.setSEO(
      `Today in ${cityName} – Power Cut, Petrol Price, Gold Rate | DailyCity`,
      `Get today’s updates in ${cityName} including power cut status, petrol price, gold rate, traffic conditions and important city updates.`
    );
  }

  loadTodayData(): void {
    this.cityDataService.getCityToday(this.city).subscribe({
      next: (res) => {
        this.todaySpecial = res.today_special;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
