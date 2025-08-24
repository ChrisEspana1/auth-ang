import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [HomeComponent],
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }
  redirectToCursoSiembraCafe() {
    this._router.navigate(['/curso-siembra-cafe']);
  }
}
