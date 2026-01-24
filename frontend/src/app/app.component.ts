import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})

export class AppComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const noindex = this.getDeepestRoute(this.route)?.snapshot.data?.['noindex'];

        if (noindex) {
          this.meta.updateTag({
            name: 'robots',
            content: 'noindex, nofollow'
          });
        } else {
          this.meta.removeTag("name='robots'");
        }
      });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}

