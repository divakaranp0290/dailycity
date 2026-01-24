import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityDataService } from '../../services/city-data.service';
import { SeoService } from '../../services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-power-cut',
  templateUrl: './power-cut.component.html',
  styleUrls: ['./power-cut.component.css']
})
export class PowerCutComponent implements OnInit {

  city = '';
  cityDisplay = '';

  powerCut: boolean | null = null;
  waterIssue: boolean | null = null;
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
        this.powerCut = res?.power_cut ?? null;
        this.waterIssue = res?.water_issue ?? null;

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
      `Power Cut Today in ${this.cityDisplay} | Electricity & Water Updates`,
      `Check today’s power cut and electricity updates in ${this.cityDisplay}. Get the latest information on power outages and water supply status.`
    );
  }

  setCanonical(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.seo.setCanonical(`https://dailycity.in/${this.city}/power-cut`);
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
          "name": "Power Cut",
          "item": `https://dailycity.in/${this.city}/power-cut`
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
          "name": `Is there a power cut today in ${this.cityDisplay}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Power cut information in ${this.cityDisplay} is updated daily based on the latest available electricity board updates.`
          }
        },
        {
          "@type": "Question",
          "name": "Why do power cuts happen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Power cuts may occur due to maintenance work, infrastructure upgrades, weather conditions or emergency repairs."
          }
        },
        {
          "@type": "Question",
          "name": "How long do power cuts usually last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The duration of power cuts varies depending on the reason and area, ranging from a few minutes to several hours."
          }
        },
        {
          "@type": "Question",
          "name": "Is water supply affected during power cuts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In some areas, water supply may be affected during prolonged power outages due to pumping disruptions."
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
