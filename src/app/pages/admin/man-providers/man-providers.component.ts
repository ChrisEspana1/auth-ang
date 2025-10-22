import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-man-providers',
  templateUrl: './man-providers.component.html',
  styleUrls: ['./man-providers.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManProvidersComponent {
  

}