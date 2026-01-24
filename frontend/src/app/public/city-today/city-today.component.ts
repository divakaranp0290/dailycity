import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { CityDataService } from '../../services/city-data.service';

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

/* ✅ MUST BE OUTSIDE COMPONENT */
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

  /** 🔹 AUTHOR */
  authorName = 'DailyCity Editorial Team';
  authorDescription =
    'Verified local information team providing daily city updates, civic alerts and essential city information.';

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private cityDataService: CityDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const slug = params.get('city-today'); // e.g. "chennai-today"

    if (!slug) {
      this.error = true;
      this.loading = false;
      return;
    }

    // chennai-today → chennai
    this.city = slug.replace('-today', '');
    this.cityDisplay = this.formatCityName(this.city);


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


formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


  /** 🔹 SEO META */
  setSEO(): void {
    const cityName = this.capitalize(this.city);

    this.seo.setSEO(
      `Today in ${cityName} – Traffic, Power Cut, Panchang | DailyCity`,
      `Get today’s updates in ${cityName} including traffic conditions, power cut status, water supply updates, sunrise, sunset, Rahu Kalam, Yamagandam and essential city information.`
    );
  }

  /** 🔹 LOAD CITY DATA */
  loadTodayData(): void {
    this.cityDataService.getCityToday(this.city).subscribe({
      next: (res) => {
        this.todaySpecial = res?.today_special ?? null;
        this.traffic = res?.traffic ?? null;
        this.power_cut = res?.power_cut ?? null;
        this.water_issue = res?.water_issue ?? null;

        this.petrol = res?.petrol ?? null;
        this.gold_22k = res?.gold_22k ?? null;
        this.silver = res?.silver ?? null;

        this.sunrise = res?.sunrise ?? null;
        this.sunset = res?.sunset ?? null;
        this.tithi = res?.tithi ?? null;
        this.rahu_kalam = res?.rahu_kalam ?? null;
        this.yamagandam = res?.yamagandam ?? null;

        this.lastUpdated = new Date().toLocaleString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata'
        });

        this.loading = false;

        // 🔥 ADSENSE INITIALIZATION (CORRECT PLACE)
        setTimeout(() => {
          this.loadAds();
        }, 0);
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  /** 🔹 ADSENSE INITIALIZER */
  loadAds(): void {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.warn('Adsense error:', e);
    }
  }

  /** 🔹 SAFE CAPITALIZE */
  capitalize(value: string | null | undefined): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  /** 🔹 BREADCRUMB SCHEMA */
setBreadcrumbSchema(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  const cityName = this.capitalize(this.city);
  const url = `https://dailycity.in/${this.city}-today`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailycity.in/" },
      { "@type": "ListItem", "position": 2, "name": cityName, "item": url },
      { "@type": "ListItem", "position": 3, "name": "Today", "item": url }
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}


  /** 🔹 ARTICLE SCHEMA */
setArticleSchema(): void {
  // ✅ SSR GUARD — CRITICAL
  if (!isPlatformBrowser(this.platformId)) return;

  const cityName = this.capitalize(this.city);
  const todayISO = new Date().toISOString();
  const pageUrl = `https://dailycity.in/${this.city}-today`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": `Today in ${cityName}: Traffic, Power Cut, Panchang & City Updates`,
    "description": `Latest daily updates from ${cityName} including traffic conditions, power cut status, water supply updates, Panchang timings and essential city information.`,
    "datePublished": todayISO,
    "dateModified": todayISO,
    "author": {
      "@type": "Organization",
      "name": "DailyCity"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DailyCity",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dailycity.in/assets/logo.png"
      }
    },
    "articleSection": "City Updates",
    "keywords": [
      `${cityName} today`,
      `${cityName} traffic`,
      `${cityName} power cut`,
      `${cityName} panchang`,
      `${cityName} petrol price`
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}


}
