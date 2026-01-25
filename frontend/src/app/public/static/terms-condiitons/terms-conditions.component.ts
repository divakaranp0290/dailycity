import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSEO(
      'Terms and Conditions | DailyCity',
      'Read the terms and conditions for using DailyCity. Understand usage guidelines, limitations, and responsibilities.'
    );
  }
}
