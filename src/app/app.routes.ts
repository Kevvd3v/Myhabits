import { Routes }               from '@angular/router';
import { LoginComponent }       from './features/auth/login/login.component';
import { RegisterComponent }    from './features/auth/register/register.component';
import { DashboardComponent }   from './features/dashboard/dashboard/dashboard.component';
import { AuthGuard }            from './core/services/auth.guard';
import { GuestGuard }           from './core/services/guest.guard';
import { CargaDatosComponent }from './features/data/carga-datos/carga-datos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',    component: LoginComponent,    canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },

  // Sólo usuarios logueados pueden entrar aquí
  { path: 'carga-datos', component: CargaDatosComponent,  canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**',        redirectTo: 'login' }
];