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

  /** 🔹 CITY INFO */
  todaySpecial: string | null = null;
  traffic: string | null = null;
  power_cut: boolean | null = null;
  water_issue: boolean | null = null;
  /** 🔹 FINANCE */
  petrol: number | null = null;
  gold_22k: number | null = null;
  silver: number | null = null;

  /** 🔹 PANCHANG */
  sunrise: string | null = null;
  sunset: string | null = null;
  tithi: string | null = null;
  rahu_kalam: string | null = null;
  yamagandam: string | null = null;

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
    this.setBreadcrumbSchema();
    this.loadTodayData();
  }

  /** 🔹 SEO META */
  setSEO(): void {
    const cityName = this.capitalize(this.city);

    this.seo.setSEO(
      `Today in ${cityName} – Power Cut, Traffic, Panchang | DailyCity`,
      `Get today’s updates in ${cityName} including traffic conditions, power cut status, water supply updates, sunrise, sunset, Rahu Kalam and other important daily city information.`
    );
  }

  /** 🔹 API CALL */
  loadTodayData(): void {
    this.cityDataService.getCityToday(this.city).subscribe({
      next: (res) => {
        this.todaySpecial = res.today_special ?? null;
        this.traffic = res.traffic ?? null;
        this.power_cut = res.power_cut ?? null;
        this.water_issue = res.water_issue ?? null;
        this.silver = res.silver ?? null;
        this.gold_22k = res.gold_22k ?? null;
        this.petrol = res.petrol ?? null;

        this.sunrise = res.sunrise ?? null;
        this.sunset = res.sunset ?? null;
        this.tithi = res.tithi ?? null;
        this.rahu_kalam = res.rahu_kalam ?? null;
        this.yamagandam = res.yamagandam ?? null;

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

  setBreadcrumbSchema(): void {
  const cityName = this.capitalize(this.city);
  const url = `https://dailycity.in/${this.city}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dailycity.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": cityName,
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Today",
        "item": url
      }
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

}
