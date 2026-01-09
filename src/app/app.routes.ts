import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

console.log('🗺 Routes configuration loaded');

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full',
    data: { name: 'Root redirect' }
  },
  { 
    path: 'login', 
    component: LoginComponent,
    data: { name: 'Login page' }
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard],
    data: { name: 'Dashboard page (protected)' }
  },
  { 
    path: '**', 
    redirectTo: '/login',
    data: { name: 'Wildcard redirect' }
  }
];

console.log('🗺 Routes configured:', routes.map(r => ({ path: r.path, component: r.component?.name, protected: !!r.canActivate })));
