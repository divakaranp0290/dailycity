import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSEO(
      'About DailyCity – Daily City Information Platform',
      'DailyCity provides daily updates like petrol prices, gold rates, power cut status, traffic conditions and important city-level information.'
    );
  }
}
