import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityTodayComponent } from './pages/city-today/city-today.component';
import { PetrolPriceComponent } from './pages/petrol-price/petrol-price.component';
import { GoldRateComponent } from './pages/gold-rate/gold-rate.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AboutComponent } from './pages/static/about/about.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/static/privacy-policy/privacy-policy.component';



const routes: Routes = [

  /* =========================
     DEFAULT
  ========================== */
  {
    path: '',
    redirectTo: 'chennai',
    pathMatch: 'full'
  },

  /* =========================
     ADMIN ROUTES (TOP PRIORITY)
  ========================== */
  {
    path: 'admin/update',
    component: AdminUpdateComponent
  },

  /* =========================
     STATIC PAGES (NO CITY)
  ========================== */
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },

  /* =========================
     CITY ROUTES (DYNAMIC)
  ========================== */
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
  ========================== */
  {
    path: '**',
    redirectTo: 'chennai'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
