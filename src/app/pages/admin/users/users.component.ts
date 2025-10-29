import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from 'src/app/components/user-form-dialog/user-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CommonModule, FormsModule, MatDialogModule]
})

export class UsersComponent implements OnInit {
  usuarios$!: Observable<any[]>;
  roles = ['admin', 'proveedor', 'estudiante'];
  ediciones: {
    [uid: string]: {
      estado: string; name: string; rol: string; activo: boolean
    }
  } = {};
  editando: { [uid: string]: boolean } = {};

  mostrarFormularioNuevoUsuario = false;
  nuevoUsuario = {
    name: '',
    email: '',
    password: '',
    rol: 'estudiante',
    activo: true,
    estado: 'pendiente',
    fecha_creacion: Timestamp.fromDate(new Date()),
    fecha_modificacion: Timestamp.fromDate(new Date()),
  };
  todosLosUsuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  usuariosPaginados: any[] = [];
  paginaActual = 1;
  usuariosPorPagina = 6;
  estadoFiltro = 'todos';
  Math: Math = Math;


  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuarios$ = this.usuariosService.getUsuarios();

    this.usuarios$.subscribe(usuarios => {
      this.todosLosUsuarios = usuarios;
      this.filtrarYPaginarUsuarios();
      usuarios.forEach(user => {
        this.ediciones[user.id] = {
          name: user.name || '',
          rol: user.rol || 'estudiante',
          activo: user.activo ?? true,
          estado: user.estado || 'pendiente'
        };
        this.editando[user.id] = false;
      });
    });

  }


  filtrarYPaginarUsuarios() {
    if (this.estadoFiltro === 'todos') {
      this.usuariosFiltrados = this.todosLosUsuarios;
    } else {
      this.usuariosFiltrados = this.todosLosUsuarios.filter(u => u.estado === this.estadoFiltro);
    }

    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    const fin = inicio + this.usuariosPorPagina;
    this.usuariosPaginados = this.usuariosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.filtrarYPaginarUsuarios();
  }

  cambiarFiltroEstado(nuevoEstado: string) {
    this.estadoFiltro = nuevoEstado;
    this.paginaActual = 1;
    this.filtrarYPaginarUsuarios();
  }

  activarEdicion(uid: string) {
    this.editando[uid] = true;
  }

  cancelarEdicion(uid: string) {
    this.editando[uid] = false;
  }

  mensajeExito: string | null = null;

  guardarCambios(uid: string) {
    const datos = this.ediciones[uid];
    this.usuariosService.actualizarUsuario(uid, datos)
      .then(() => {
        this.mensajeExito = 'Cambios guardados correctamente';
        this.cancelarEdicion(uid);
        setTimeout(() => {
          this.mensajeExito = null;
        }, 3000);
      })
      .catch(err => console.error('Error al actualizar usuario', err));
  }

  crearUsuario() {
    this.usuariosService.crearUsuario(this.nuevoUsuario)
      .then(() => {
        console.log('Usuario creado');
        this.mostrarFormularioNuevoUsuario = false;
        this.nuevoUsuario = {
          name: '',
          email: '',
          password: '',
          rol: 'estudiante',
          activo: true,
          estado: '',
          fecha_creacion: Timestamp.fromDate(new Date()),
          fecha_modificacion: Timestamp.fromDate(new Date()),
        };
      })
      .catch(err => console.error('Error al crear usuario', err));
  }

  abrirModalNuevoUsuario() {
    const dialogRef = this.dialog.open(UserFormDialogComponent);

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.mensajeExito = 'Usuario creado correctamente';
        setTimeout(() => this.mensajeExito = null, 3000);
      }
    });
  }
}