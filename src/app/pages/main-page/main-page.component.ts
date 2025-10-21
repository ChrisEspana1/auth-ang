import { Component } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  navActive: boolean = false;
  toggleNav() {
    this.navActive = !this.navActive;
  }
}
