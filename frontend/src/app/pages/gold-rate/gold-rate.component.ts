import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gold-rate',
  templateUrl: './gold-rate.component.html',
  styleUrls: ['./gold-rate.component.css']
})
export class GoldRateComponent implements OnInit {

  city!: string;
  date!: string;

  gold22k: number | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city')!;
    this.date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    this.setSEO();
    this.loadGoldRate();
  }

  setSEO(): void {
    const cityName = this.capitalize(this.city);

    this.seo.setSEO(
      `Gold Rate Today in ${cityName} – 22K Price | DailyCity`,
      `Check today’s 22K gold rate in ${cityName}. Get the latest gold price per gram with daily updates.`
    );
  }

  loadGoldRate(): void {
    this.http
      .get<any>(`http://localhost:3000/api/finance/gold/${this.city}`)
      .subscribe({
        next: (res) => {
          this.gold22k = res?.gold_22k ?? null;
          this.loading = false;
        },
        error: () => {
          this.gold22k = null;
          this.loading = false;
        }
      });
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
