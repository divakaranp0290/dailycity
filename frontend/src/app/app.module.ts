import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CityTodayComponent } from './pages/city-today/city-today.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AboutComponent } from './pages/static/about/about.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/static/privacy-policy/privacy-policy.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { AdminAuditComponent } from './pages/admin-audit/admin-audit.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminHeaderComponent } from './shared/admin-header/admin-header.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    CityTodayComponent,
    AdminUpdateComponent,
    AdminAuditComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    PublicLayoutComponent,
    AdminLayoutComponent
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
