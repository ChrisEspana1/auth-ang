import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatButtonToggleModule],
  selector: 'app-home',
  template: `
    <mat-toolbar color="accent" class="mt-3">
      <span>Home</span>
      <mat-button-toggle-group>
        <button mat-button (click)="redirectTo('venta/index')">Iniciar Proceso Venta</button>
        <button mat-button (click)="redirectTo('producto/index')">Ingreso de Productos</button>
        <button mat-button (click)="redirectTo('TicketController/index')">Reimpresion de ticket</button>
        <button mat-button (click)="redirectTo('proveedor/index')">Ingreso de Proveedores y Pedido</button>
        <button mat-button (click)="redirectTo('pedidos/index')">Ingreso de Pedidos de Compras</button>
      </mat-button-toggle-group>
      <button mat-flat-button (click)="logOut()">Log out</button>
    </mat-toolbar>
    <div class="centered-div mt-3">
      <h1 class="mt-3">Bienvenidos a nuestra tienda de artículos deportivos</h1>
      <p>Encuentra lo que necesitas para tus deportes favoritos</p>
      <a href="#" class="btn btn-primary">Explorar productos</a>
    </div>

    <div class="featured-products">
      <div class="product">
        <img src="https://www.pullcoleccionables.com/wp-content/uploads/2021/01/soccer-balon-andrea-pirlo-1-300x300.jpg" alt="Producto 1">
        <h2>Articulos de Fútbol</h2>
        <p>Desde $50.00</p>
        <a href="#" class="btn">Ver más</a>
      </div>
      <div class="product">
        <img src="https://s.alicdn.com/@sc04/kf/Hfc864f7a12c0459b97398f9d8a2c686c1.jpg_300x300.jpg" alt="Producto 2">
        <h2>Ropa de Básquetball</h2>
        <p>Desde $30.00</p>
        <a href="#" class="btn">Ver más</a>
      </div>
      <div class="product">
        <img src="https://voit.com.mx/cdn/shop/products/82096_1_1_1200x630.jpg?v=1643085607" alt="Producto 3">
        <h2>Guantes de Beisbol</h2>
        <p>Desde $25.00</p>
        <a href="#" class="btn">Ver más</a>
      </div>
    </div>

    <div class="cta">
      <h2>Únete a nuestra comunidad deportiva</h2>
      <p>Regístrate para recibir ofertas exclusivas y noticias sobre nuestros productos</p>
      <a href="#" class="btn">Regístrate ahora</a>
    </div>

    <footer class="footer">
      <p>Tienda de Artículos Deportivos &copy; 2023</p>
    </footer>
  `,
  styleUrls: ['./style.css'], 
  styles: [
    `
      mat-toolbar {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export default class HomeComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }

  redirectTo(url: string): void {
    this._router.navigateByUrl(url);
  }
}
