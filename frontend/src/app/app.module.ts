import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CityTodayComponent } from './public/city-today/city-today.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { AboutComponent } from './public/static/about/about.component';
import { ContactComponent } from './public/static/contact/contact.component';
import { PrivacyPolicyComponent } from './public/static/privacy-policy/privacy-policy.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminAuditComponent } from './admin/admin-audit/admin-audit.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHeaderComponent } from './shared/admin-header/admin-header.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomeComponent } from './public/home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { GoldPriceComponent } from './public/gold-price/gold-price.component';
import { PetrolPriceComponent } from './public/petrol-price/petrol-price.component';
import { PowerCutComponent } from './public/power-cut/power-cut.component';
import { TermsAndConditionsComponent } from './public/static/terms-condiitons/terms-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CityTodayComponent,
    AdminUpdateComponent,
    AdminAuditComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ContactComponent,
    FooterComponent,
    SidebarComponent,
    GoldPriceComponent,
    PetrolPriceComponent,
    PowerCutComponent,
    HeaderComponent,
    PublicLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
