import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CityTodayComponent } from './pages/city-today/city-today.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { PetrolPriceComponent } from './pages/petrol-price/petrol-price.component';
import { GoldRateComponent } from './pages/gold-rate/gold-rate.component';
import { AboutComponent } from './pages/static/about/about.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/static/privacy-policy/privacy-policy.component';


const routes: Routes = [
  { path: 'admin/update', component: AdminUpdateComponent },
  { path: ':city/today', component: CityTodayComponent },
  {
    path: ':city/petrol-price-today',
    component: PetrolPriceComponent
  },
  {
    path: ':city/gold-rate-today',
    component: GoldRateComponent
  },
  { path: 'about', component: AboutComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'chennai/today', pathMatch: 'full' },
  { path: '**', redirectTo: 'chennai/today' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
