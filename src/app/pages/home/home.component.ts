import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { VentaComponent } from '../venta/venta.component';
import { TicketssComponent } from '../ticketss/ticketss.component';
import { ProveedorComponent } from '../proveedor/proveedor.component';
import { CompraComponent } from '../compra/compra.component';

@Component({
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatButtonToggleModule, VentaComponent, TicketssComponent, ProveedorComponent, CompraComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
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
  private _router: Router;
  private authservice: AuthService;

  constructor(router: Router, authService: AuthService) {
    this._router = router;
    this.authservice = authService;
  }

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
  redirectToProducto() {
    this._router.navigate(['/producto']);
  }
  redirectToVenta() {
    this._router.navigate(['/venta']);
  }
  redirectToTickets() {
    this._router.navigate(['/tickets']);
  }
  redirectToProveedor(){
    this._router.navigate(['/proveedor']);
  }
  redirectToCompras(){
    this._router.navigate(['/compras']);
  }
}
