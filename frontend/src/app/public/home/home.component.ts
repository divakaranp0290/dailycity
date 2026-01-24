import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

interface CityCard {
  city: string;
  slug: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todayCities: CityCard[] = [];

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.setSEO();
    this.loadCities();
  }

  private setSEO(): void {
    this.title.setTitle(
      'DailyCity – Today City Updates, Petrol Price, Gold Rate & Alerts'
    );

    this.meta.updateTag({
      name: 'description',
      content:
        'DailyCity provides today city updates including traffic status, power cuts, petrol price, gold rate, water issues and daily alerts for major Indian cities.'
    });
  }

  private loadCities(): void {
    // 🔥 Static list first (BEST for SEO & AdSense)
    this.todayCities = [
      {
        city: 'Chennai',
        slug: 'chennai-today',
        description:
          'Traffic updates, power cut status, petrol price and gold rate in Chennai today.'
      },
      {
        city: 'Bangalore',
        slug: 'bangalore-today',
        description:
          'Check Bangalore today updates including traffic, fuel price and city alerts.'
      },
      {
        city: 'Hyderabad',
        slug: 'hyderabad-today',
        description:
          'Hyderabad today city updates, petrol price, gold rate and power cut information.'
      },
      {
        city: 'Mumbai',
        slug: 'mumbai-today',
        description:
          'Mumbai today updates including traffic status, fuel price and daily alerts.'
      }
    ];
  }
}
