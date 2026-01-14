import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-petrol-price',
  templateUrl: './petrol-price.component.html',
  styleUrls: ['./petrol-price.component.css']
})
export class PetrolPriceComponent implements OnInit {

  city!: string;
  date!: string;

  petrolPrice: number | null = null;

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
    this.loadPetrolPrice();
  }

  setSEO(): void {
    const cityName = this.capitalize(this.city);

    this.seo.setSEO(
      `Petrol Price Today in ${cityName} – Latest Fuel Rate | DailyCity`,
      `Check today’s petrol price in ${cityName}. Get the latest fuel rates per litre with daily updates.`
    );
  }

  loadPetrolPrice(): void {
    this.http
      .get<any>(`http://localhost:3000/api/finance/petrol/${this.city}`)
      .subscribe({
        next: (res) => {
          this.petrolPrice = res?.petrol ?? null;
          this.loading = false;
        },
        error: () => {
          this.petrolPrice = null;
          this.loading = false;
        }
      });
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
