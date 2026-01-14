import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CityTodayComponent } from './pages/city-today/city-today.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { PetrolPriceComponent } from './pages/petrol-price/petrol-price.component';
import { GoldRateComponent } from './pages/gold-rate/gold-rate.component';
import { AboutComponent } from './pages/static/about/about.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/static/privacy-policy/privacy-policy.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CityTodayComponent,
    AdminUpdateComponent,
    PetrolPriceComponent,
    GoldRateComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
