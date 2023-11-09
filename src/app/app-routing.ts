import { RouterModule, Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards';
import { NgModule } from '@angular/core';
import ProductoComponent from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { TicketssComponent } from './pages/ticketss/ticketss.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
        loadComponent: () => import('./pages/auth/log-in/log-in.component'),
      },
    ],
  },
  { path: 'producto',
    canActivate: [authGuard],
   component: ProductoComponent 
  },
  { path: 'venta',
    canActivate: [authGuard],
   component: VentaComponent
  },
  { path: 'tickets',
    canActivate: [authGuard],
    component: TicketssComponent
 },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRouting {}