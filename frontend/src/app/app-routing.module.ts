import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

import { HomeComponent } from './public/home/home.component';
import { CityTodayComponent } from './public/city-today/city-today.component';
import { AboutComponent } from './public/static/about/about.component';
import { ContactComponent } from './public/static/contact/contact.component';
import { PrivacyPolicyComponent } from './public/static/privacy-policy/privacy-policy.component';

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { AdminAuditComponent } from './admin/admin-audit/admin-audit.component';

import { AdminAuthGuard } from './guards/admin-auth.guard';

import { PetrolPriceComponent } from './public/petrol-price/petrol-price.component';
import { GoldPriceComponent } from './public/gold-price/gold-price.component';
import { PowerCutComponent } from './public/power-cut/power-cut.component';

const routes: Routes = [
  {
  path: '',
  component: PublicLayoutComponent,
  children: [
    { path: '', component: HomeComponent },

    /* STATIC PAGES FIRST */
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },

    /* CITY SUB PAGES */
    { path: ':city/gold-rate', component: GoldPriceComponent },
    { path: ':city/petrol-price', component: PetrolPriceComponent },
    { path: ':city/power-cut', component: PowerCutComponent },


    /* CITY TODAY (KEEP LAST) */
    { path: ':city-today', component: CityTodayComponent },
  ]
},

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'login', component: AdminLoginComponent },
      {
        path: 'update',
        component: AdminUpdateComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'audit',
        component: AdminAuditComponent,
        canActivate: [AdminAuthGuard]
      }
    ]
  },
  { path: '**', redirectTo: '' }
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
