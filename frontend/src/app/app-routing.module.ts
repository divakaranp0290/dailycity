import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Pages */
import { CityTodayComponent } from './pages/city-today/city-today.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminAuditComponent } from './pages/admin-audit/admin-audit.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';


const routes: Routes = [

  // PUBLIC SITE
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'chennai', pathMatch: 'full' },
      { path: ':city', component: CityTodayComponent },

    ]
  },

  // ADMIN
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'update', component: AdminUpdateComponent },
      { path: 'audit', component: AdminAuditComponent }
    ]
  },

  // ADMIN LOGIN (NO HEADER)
  { path: 'admin/login', component: AdminLoginComponent },

  // FALLBACK
  { path: '**', redirectTo: 'chennai' }
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
export class AppRoutingModule { }
