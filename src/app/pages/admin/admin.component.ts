import { Component } from '@angular/core';
import HomeComponent from "../home/home.component";

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [HomeComponent]
})
export class AdminComponent {

}
