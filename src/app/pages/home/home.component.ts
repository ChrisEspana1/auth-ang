import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatButtonToggleModule],
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
}
