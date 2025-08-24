import { RouterModule, Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards';
import { NgModule } from '@angular/core';
import ProductoComponent from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { TicketssComponent } from './pages/ticketss/ticketss.component';
import { CompraComponent } from './pages/compra/compra.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForosComponent } from './pages/foros/foros.component';

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
 { path: 'proveedor',
 canActivate: [authGuard],
 component: ProveedorComponent
},
{ path: 'compras',
canActivate: [authGuard],
component: CompraComponent
},
{ path: 'cursos',
canActivate: [authGuard],
component: CursosComponent
},
{ path: 'foros',
canActivate: [authGuard],
component: ForosComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRouting {}