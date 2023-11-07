import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./style.css']
})
export class ProductoComponent implements OnInit {
    
  constructor(private router: Router) { }
  redirectTo(route: string): void {
    this.router.navigate([route]);
  }  
  ngOnInit(): void {
    // Puedes cargar la lista de productos al iniciar el componente
    // Usar un servicio para obtener los datos es una buena práctica
  }

  agregarProducto(): void {
    // Aquí puedes agregar la lógica para agregar un producto
    // Debes enviar los datos al servidor o almacenarlos en tu base de datos
  }

  regresar(): void {
    // Implementa la navegación para regresar a la página anterior
    // Puedes usar el enrutador de Angular para esto
  }
}
