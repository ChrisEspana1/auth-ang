import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./style.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet
  ]
})
export default class HomeComponent {
  constructor(private _router: Router, private authservice: AuthService) {}

  redirectTo(url: string): void {
    this._router.navigateByUrl(url);
  }

  goHome() {
    this._router.navigateByUrl('/home');
  }

  redirectToForos() {
    this._router.navigate(['/foros']);
  }

  redirectToCursos() {
    this._router.navigate(['/cursos']);
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }

  @ViewChild('sidenav') sidenav: any;

  toggleMenu() {
    this.sidenav.toggle();
  }
}

