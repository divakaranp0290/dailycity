import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityDataService } from '../../services/city-data.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-city-today',
  templateUrl: './city-today.component.html',
  styleUrls: ['./city-today.component.css']
})
export class CityTodayComponent implements OnInit {

  city!: string;

  // API-driven fields
  powerCut = false;
  waterIssue = false;
  traffic = '';
  petrol!: number;
  diesel!: number;
  gold22k!: number;
  silver!: number;
  updatedAt!: string;

  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private cityService: CityDataService,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap
      .get('city')!
      .toLowerCase()
      .trim();
    this.seo.setCanonical(window.location.href.split('?')[0]);
    this.loadCityData();
  }

  loadCityData(): void {
    this.loading = true;

    this.cityService.getCityToday(this.city).subscribe({
      next: (data) => {
        this.powerCut = data.power_cut;
        this.waterIssue = data.water_issue;
        this.traffic = data.traffic;
        this.petrol = data.petrol;
        this.diesel = data.diesel;
        this.gold22k = data.gold_22k;
        this.silver = data.silver;
        this.updatedAt = data.updated_at;

        //CENTRALIZED SEO & SCHEMA
        this.seo.setMeta(this.city);
        this.seo.addWebPageSchema(this.city, this.updatedAt);
        this.seo.addBreadcrumbSchema(this.city);
        this.seo.addFaqSchema(this.city, this.petrol, this.powerCut);

        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
