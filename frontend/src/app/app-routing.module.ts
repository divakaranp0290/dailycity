import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CityTodayComponent } from './pages/city-today/city-today.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';


const routes: Routes = [
  { path: 'admin/update', component: AdminUpdateComponent },
  { path: ':city/today', component: CityTodayComponent },
  { path: '', redirectTo: 'chennai/today', pathMatch: 'full' },
  { path: '**', redirectTo: 'chennai/today' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
