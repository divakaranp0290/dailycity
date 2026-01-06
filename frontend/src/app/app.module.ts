import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CityTodayComponent } from './pages/city-today/city-today.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminUpdateComponent } from './admin-update/admin-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CityTodayComponent,
    AdminUpdateComponent
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
export class AppModule {}
