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
export class ManProvidersComponent implements OnInit {
  proveedores: Proveedor[] = [];
  ediciones: { [id: number]: Partial<Proveedor> } = {};
  editando: { [id: number]: boolean } = {};
  mostrarFormularioNuevoProveedor = false;
  mensajeExito: string | null = null;

  nuevoProveedor: Partial<Proveedor> = {
    curso_id: '',
    nombre: '',
    contacto: '',
    servicio: '',
    tipo_contacto: 'whatsapp',
    activo: 1
  };

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
    this.cargarTodosLosProveedores();
  }

  cargarTodosLosProveedores(): void {
    this.proveedoresService.getTodosLosProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        data.forEach(p => {
          this.ediciones[p.id] = { ...p };
          this.editando[p.id] = false;
        });
      },
      error: (err) => console.error('Error al cargar todos los proveedores', err)
    });
  }

  activarEdicion(id: number): void {
    this.editando[id] = true;
  }

  cancelarEdicion(id: number): void {
    this.editando[id] = false;
  }

  guardarCambios(id: number): void {
    const datos = this.ediciones[id];
    this.proveedoresService.actualizarProveedor(datos.curso_id!, id, datos).subscribe({
      next: () => {
        this.mensajeExito = 'Cambios guardados correctamente';
        this.cancelarEdicion(id);
        setTimeout(() => this.mensajeExito = null, 3000);
      },
      error: (err) => console.error('Error al actualizar proveedor', err)
    });
  }

  crearProveedor(): void {
    this.proveedoresService.crearProveedor(this.nuevoProveedor.curso_id!, this.nuevoProveedor).subscribe({
      next: () => {
        this.mostrarFormularioNuevoProveedor = false;
        this.nuevoProveedor = {
          curso_id: '',
          nombre: '',
          contacto: '',
          servicio: '',
          tipo_contacto: 'whatsapp',
          activo: 1
        };
        this.cargarTodosLosProveedores();
      },
      error: (err) => console.error('Error al crear proveedor', err)
    });
  }

  alternarEstadoProveedor(proveedor: Proveedor): void {
    const nuevoEstado = proveedor.activo ? 0 : 1;
    this.proveedoresService.cambiarEstadoProveedor(proveedor.curso_id, proveedor.id, nuevoEstado).subscribe({
      next: () => {
        this.mensajeExito = `Proveedor ${nuevoEstado ? 'habilitado' : 'inhabilitado'} correctamente`;
        this.cargarTodosLosProveedores();
        setTimeout(() => this.mensajeExito = null, 3000);
      },
      error: () => alert('Error al cambiar el estado del proveedor')
    });
  }

  inhabilitarProveedor(proveedor: Proveedor): void {
    this.proveedoresService.inhabilitarProveedor(proveedor.curso_id, proveedor.id).subscribe({
      next: () => {
        this.mensajeExito = 'Proveedor inhabilitado correctamente';
        this.cargarTodosLosProveedores();
        setTimeout(() => this.mensajeExito = null, 3000);
      },
      error: () => alert('Error al inhabilitar proveedor')
    });
  }
}