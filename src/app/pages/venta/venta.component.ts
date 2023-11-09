import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  HomeComponent  from '../home/home.component';

@Component({
  standalone: true,
  selector: 'app-venta',
  imports: [HomeComponent],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  

})
export class VentaComponent {

}
