import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityDataService } from '../../services/city-data.service';
import { SeoService } from '../../services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-petrol-price',
  templateUrl: './petrol-price.component.html',
  styleUrls: ['./petrol-price.component.css']
})
export class PetrolPriceComponent implements OnInit {

  city = '';
  cityDisplay = '';

  petrol: number | null = null;
  diesel: number | null = null;
  lastUpdated = '';

  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private cityService: CityDataService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.city = params.get('city') || 'chennai';
      this.cityDisplay = this.formatCity(this.city);

      this.setSEO();
      this.setCanonical();
      this.setBreadcrumbSchema();
      this.setFAQSchema();

      this.loadData();
    });
  }

  loadData(): void {
    this.cityService.getCityToday(this.city).subscribe({
      next: res => {
        this.petrol = res?.petrol ?? null;
        this.diesel = res?.diesel ?? null;

        this.lastUpdated = new Date().toLocaleString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  /* ================= SEO ================= */

  setSEO(): void {
    this.seo.setSEO(
      `Petrol Price Today in ${this.cityDisplay} | Diesel Rate`,
      `Check today’s petrol and diesel prices in ${this.cityDisplay}. Fuel rates are updated daily based on government revisions.`
    );
  }

  setCanonical(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.seo.setCanonical(`https://dailycity.in/${this.city}/petrol-price`);
  }

  setBreadcrumbSchema(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.seo.injectSchema({
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
          "name": this.cityDisplay,
          "item": `https://dailycity.in/${this.city}-today`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Petrol Price",
          "item": `https://dailycity.in/${this.city}/petrol-price`
        }
      ]
    });
  }

  setFAQSchema(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.seo.injectSchema({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is today’s petrol price in ${this.cityDisplay}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Petrol price in ${this.cityDisplay} is revised daily based on international crude oil prices, currency exchange rates and government policies.`
          }
        },
        {
          "@type": "Question",
          "name": `What is today’s diesel price in ${this.cityDisplay}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Diesel prices in ${this.cityDisplay} are updated daily and may vary slightly due to local taxes and transportation costs.`
          }
        },
        {
          "@type": "Question",
          "name": "Why do petrol and diesel prices change every day?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fuel prices change daily due to fluctuations in global crude oil prices, currency movements and government taxation policies."
          }
        },
        {
          "@type": "Question",
          "name": "Is petrol price same across all cities in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Petrol prices differ across cities because state taxes and local levies vary."
          }
        }
      ]
    });
  }

  formatCity(slug: string): string {
    return slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
