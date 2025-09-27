import { RouterModule, Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards';
import { NgModule } from '@angular/core';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForosComponent } from './pages/foros/foros.component';
import { CursoSiembraCafeComponent } from './pages/curso-siembra-cafe/curso-siembra-cafe.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
   // loadComponent: () => import('./pages/home/home.component'),
    loadComponent: () => import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
   // loadComponent: () => import('./pages/home/home.component'),
    loadComponent: () => import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
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
{ path: 'cursos',
canActivate: [authGuard],
component: CursosComponent
},
{ path: 'foros',
canActivate: [authGuard],
component: ForosComponent
},
{ path: 'curso-siembra-cafe',
canActivate: [authGuard],
component: CursoSiembraCafeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRouting {}