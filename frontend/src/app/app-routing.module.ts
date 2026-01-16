import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Pages */
import { CityTodayComponent } from './pages/city-today/city-today.component';
import { PetrolPriceComponent } from './pages/petrol-price/petrol-price.component';
import { GoldRateComponent } from './pages/gold-rate/gold-rate.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';


/* Static pages (optional – add if you have them) */
// import { AboutComponent } from './static/about/about.component';
// import { ContactComponent } from './static/contact/contact.component';
// import { PrivacyPolicyComponent } from './static/privacy-policy/privacy-policy.component';

const routes: Routes = [

  /* =========================
     ROOT REDIRECT
     ========================= */
  {
    path: '',
    redirectTo: 'chennai',
    pathMatch: 'full'
  },

  /* =========================
     ADMIN (MUST BE ABOVE :city)
     ========================= */
  {
    path: 'admin/update',
    component: AdminUpdateComponent
  },

  /* =========================
     CITY ROUTES
     ========================= */
  {
    path: ':city',
    component: CityTodayComponent
  },
  {
    path: ':city/petrol-price',
    component: PetrolPriceComponent
  },
  {
    path: ':city/gold-rate',
    component: GoldRateComponent
  },

  /* =========================
     FALLBACK
     ========================= */
  {
    path: '**',
    redirectTo: 'chennai'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
