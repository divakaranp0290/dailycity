import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface City {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // 🔥 Keep static initially (best for SEO + reliability)
  cities: City[] = [
    { name: 'Chennai', slug: 'chennai-today' },
    { name: 'Bangalore', slug: 'bangalore-today' },
    { name: 'Hyderabad', slug: 'hyderabad-today' },
    { name: 'Mumbai', slug: 'mumbai-today' },
    { name: 'Delhi', slug: 'delhi-today' }
  ];

  constructor(private router: Router) {}

   ngOnInit() {
    // this.router.events.subscribe(() => {
    //   const urlParts = this.router.url.split('/');
    //   if (urlParts[1]) {
    //     this.selectedCity = urlParts[1];
    //   }
    // });
  }

  onCityChange(event: Event): void {
    const slug = (event.target as HTMLSelectElement).value;
    if (slug) {
      this.router.navigateByUrl(`/${slug}`);
    }
  }
}
