import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./style.css']
})
export default class ProductoComponent {
    
  constructor(private router: Router) { }

  agregarProducto(): void {
    // Aquí puedes agregar la lógica para agregar un producto
    // Debes enviar los datos al servidor o almacenarlos en tu base de datos
  }

  regresar(): void {
  this.router.navigate(['']);
  }
}
