import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cities = ['chennai', 'bangalore', 'hyderabad'];
  selectedCity = 'chennai';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const urlParts = this.router.url.split('/');
      if (urlParts[1]) {
        this.selectedCity = urlParts[1];
      }
    });
  }

  onCityChange(city: string) {
    this.router.navigate(['/', city]);
  }
}
