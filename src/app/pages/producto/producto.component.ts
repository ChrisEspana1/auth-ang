import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import HomeComponent from '../home/home.component';

@Component({
  standalone: true,
  selector: 'app-producto',
  imports: [HomeComponent],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.style.css']
})
export default class ProductoComponent {
  
    constructor(private router: Router) { }

  agregarProducto(
    producto: string,
    stock: string,
    idprov: string) {
      console.log('Producto: ' + producto + stock + idprov);
  //    this.producto.producto = producto;
    //  this.producto.existencia = existencia;
      //this.producto.id_categoria = categoria;


  }

  regresar(): void {
  this.router.navigate(['']);
  }
}
