import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';
@Component({
  standalone: true,
  imports: [HomeComponent],
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

}
