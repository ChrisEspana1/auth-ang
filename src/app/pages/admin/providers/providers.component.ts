import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Proveedor } from 'src/app/models/proveedor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProvidersComponent implements OnInit {

  cursoId!: string;
  cursoNombre!: string;
  proveedores: Proveedor[] = [];
  mostrarFormularioNuevo = false;
  editandoIndice: number | null = null;
  nuevoProveedor: Proveedor = {
    id: 0,
    curso_id: '',
    nombre: '',
    contacto: '',
    servicio: '',
    tipo_contacto: 'whatsapp',
    activo: 1
  };

  constructor(private route: ActivatedRoute, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.paramMap.get('id')!;
    this.nuevoProveedor.curso_id = this.cursoId;
    
    this.cursoService.getCursoPorId(this.cursoId).subscribe({
      next: (curso) => {
      this.cursoNombre = curso.titulo;
},
    error: (err) => console.error('Error al obtener el curso', err)
  });

    this.cargarProveedores();
  }
  
  cargarProveedores(): void {
    this.cursoService.getProveedoresPorCurso(this.cursoId).subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error al cargar proveedores', err)
    });
  }

  agregarProveedor(): void {
    this.cursoService.crearProveedor(this.cursoId, this.nuevoProveedor).subscribe({
      next: () => {
        alert('Proveedor agregado correctamente');
        this.cargarProveedores();
        this.nuevoProveedor = {
          id: 0,
          curso_id: this.cursoId,
          nombre: '',
          contacto: '',
          servicio: '',
          tipo_contacto: 'whatsapp',
          activo: 1
        };
        this.mostrarFormularioNuevo = false;
      },
      error: () => alert('Error al agregar proveedor')
    });
  }

  modificarProveedor(indice: number): void {
    this.editandoIndice = indice;
  }

  guardarCambios(indice: number): void {
    const proveedor = this.proveedores[indice];
    this.cursoService.actualizarProveedor(this.cursoId, proveedor.id, proveedor).subscribe({
      next: () => {
        alert('Proveedor actualizado correctamente');
        this.editandoIndice = null;
      },
      error: () => alert('Error al actualizar proveedor')
    });
  }
  alternarEstadoProveedor(proveedor: Proveedor): void {
  const nuevoEstado = proveedor.activo ? 0 : 1;

  this.cursoService.cambiarEstadoProveedor(this.cursoId, proveedor.id, nuevoEstado).subscribe({
    next: () => {
      alert(`Proveedor ${nuevoEstado ? 'habilitado' : 'inhabilitado'} correctamente`);
      this.cargarProveedores();
    },
    error: () => alert('Error al cambiar el estado del proveedor')
  });
}

  inhabilitarProveedor(id: number): void {
    this.cursoService.inhabilitarProveedor(this.cursoId, id).subscribe({
      next: () => {
        alert('Proveedor inhabilitado');
        this.cargarProveedores();
      },
      error: () => alert('Error al inhabilitar proveedor')
    });
  }

  cancelarEdicion(): void {
    this.editandoIndice = null;
  }

  volverEdicionCurso(): void {
    window.history.back();
  }

  toggleFormularioNuevo(): void {
    this.mostrarFormularioNuevo = !this.mostrarFormularioNuevo;
  }
}