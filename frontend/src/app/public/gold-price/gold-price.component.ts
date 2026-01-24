import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { CityDataService } from '../../services/city-data.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-gold-price',
  templateUrl: './gold-price.component.html',
  styleUrls: ['./gold-price.component.css']
})
export class GoldPriceComponent implements OnInit {

  city = '';
  cityDisplay = '';

  gold22k: number | null = null;
  silver: number | null = null;
  lastUpdated = '';

  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private cityService: CityDataService,
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
        this.gold22k = res?.gold_22k ?? null;
        this.silver = res?.silver ?? null;

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

  setSEO(): void {
    this.seo.setSEO(
      `Gold Rate Today in ${this.cityDisplay} – 22K Gold Price`,
      `Check today’s gold rate in ${this.cityDisplay}. Get updated 22K gold price per gram and silver rate.`
    );
  }

  setCanonical(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.seo.setCanonical(`https://dailycity.in/${this.city}/gold-rate`);
  }

  setBreadcrumbSchema(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.seo.injectSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailycity.in/" },
        { "@type": "ListItem", "position": 2, "name": this.cityDisplay, "item": `https://dailycity.in/${this.city}-today` },
        { "@type": "ListItem", "position": 3, "name": "Gold Rate", "item": `https://dailycity.in/${this.city}/gold-rate` }
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
        "name": `What is today’s gold rate in ${this.cityDisplay}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Gold rates in ${this.cityDisplay} are updated daily based on international market trends, currency exchange rates and local demand.`
        }
      },
      {
        "@type": "Question",
        "name": "Is gold price same across all cities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gold prices may vary slightly between cities due to differences in local taxes, transportation and jeweller margins."
        }
      },
      {
        "@type": "Question",
        "name": `What is today’s silver rate in ${this.cityDisplay}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Silver prices in ${this.cityDisplay} are updated daily based on market demand, industrial usage and global silver prices.`
        }
      },
      {
        "@type": "Question",
        "name": "Does silver price change daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, silver prices change daily depending on global market movements, industrial demand and currency fluctuations."
        }
      }
    ]
  });
}



  formatCity(slug: string): string {
    return slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }
}
