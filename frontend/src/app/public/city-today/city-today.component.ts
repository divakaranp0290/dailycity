import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { CityDataService } from '../../services/city-data.service';

declare var adsbygoogle: any[];

@Component({
  selector: 'app-city-today',
  templateUrl: './city-today.component.html',
  styleUrls: ['./city-today.component.css']
})
export class CityTodayComponent implements OnInit {

  city = '';
  cityDisplay = '';
  date = '';
  lastUpdated = '';

  loading = true;
  error = false;

  todaySpecial: string | null = null;
  traffic: string | null = null;
  power_cut: string | null = null;
  water_issue: string | null = null;


  petrol: number | null = null;
  gold_22k: number | null = null;
  silver: number | null = null;

  sunrise: string | null = null;
  sunset: string | null = null;
  tithi: string | null = null;
  rahu_kalam: string | null = null;
  yamagandam: string | null = null;

  authorName = 'DailyCity Editorial Team';
  authorDescription =
    'Verified local information team providing daily city updates, civic alerts and essential city information.';

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private cityService: CityDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const slug = params.get('city-today'); 

    if (!slug) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.city = slug.replace('-today', '');
    this.cityDisplay = this.city.charAt(0).toUpperCase() + this.city.slice(1);

    this.date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

      this.setSEO();
      this.setBreadcrumbSchema();
      this.setArticleSchema();
      this.loadTodayData();
    });
  }

  /** ✅ LOAD DATA */
  loadTodayData(): void {
    this.loading = true;
    this.error = false;

    this.cityService.getCityToday(this.city).subscribe({
      next: (data) => {
        if (!data) {
          this.error = true;
          this.loading = false;
          return;
        }

        this.todaySpecial = data.today_special ?? null;
        this.traffic = data.traffic ?? null;
        this.power_cut = data.power_cut ?? null;
        this.water_issue = data.water_issue ?? null;

        this.petrol = data.petrol ? Number(data.petrol) : null;
        this.gold_22k = data.gold_22k ? Number(data.gold_22k) : null;
        this.silver = data.silver ? Number(data.silver) : null;

        this.sunrise = data.sunrise ?? null;
        this.sunset = data.sunset ?? null;
        this.tithi = data.tithi ?? null;
        this.rahu_kalam = data.rahu_kalam ?? null;
        this.yamagandam = data.yamagandam ?? null;

        this.lastUpdated = new Date(data.created_at || Date.now())
          .toLocaleString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

        this.loading = false;

        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.loadAds(), 0);
        }
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  /** ✅ ADSENSE */
  loadAds(): void {
    try {
      (window as any).adsbygoogle?.push({});
    } catch {}
  }

  /** ✅ SEO */
  setSEO(): void {
    const name = this.formatCity(this.city);
    this.seo.setSEO(
      `Today in ${name} – Traffic, Power Cut, Panchang | DailyCity`,
      `Get today’s updates in ${name} including traffic, power cut, fuel prices and Panchang details.`
    );
  }

  /** ✅ HELPERS */
  formatCity(city: string): string {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }

  capitalize(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  }

  /** ✅ BREADCRUMB */
  setBreadcrumbSchema(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const name = this.formatCity(this.city);
    const url = `https://dailycity.in/${this.city}-today`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailycity.in/" },
        { "@type": "ListItem", "position": 2, "name": name, "item": url }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /** ✅ ARTICLE SCHEMA */
  setArticleSchema(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const name = this.formatCity(this.city);
    const url = `https://dailycity.in/${this.city}-today`;
    const now = new Date().toISOString();

    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": `Today in ${name}: Traffic, Power Cut, Panchang & City Updates`,
      "description": `Latest daily updates from ${name} including traffic, power cut, fuel prices and Panchang.`,
      "datePublished": now,
      "dateModified": now,
      "mainEntityOfPage": url,
      "author": { "@type": "Organization", "name": "DailyCity" },
      "publisher": {
        "@type": "Organization",
        "name": "DailyCity",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dailycity.in/assets/logo.png"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  formatBulletText(text: string | null): string[] {
  if (!text) return [];
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
}
