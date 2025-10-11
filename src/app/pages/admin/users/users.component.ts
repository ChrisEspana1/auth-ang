import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class UsersComponent implements OnInit {
  usuarios$!: Observable<any[]>;
  roles = ['admin', 'proveedor', 'estudiante'];
  ediciones: { [uid: string]: { name: string; rol: string; activo: boolean } } = {};
  editando: { [uid: string]: boolean } = {};

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuarios$ = this.usuariosService.getUsuarios();

    this.usuarios$.subscribe(usuarios => {
      usuarios.forEach(user => {
        this.ediciones[user.id] = {
          name: user.name || '',
          rol: user.rol || 'estudiante',
          activo: user.activo ?? true
        };
        this.editando[user.id] = false;
      });
    });
  }

  activarEdicion(uid: string) {
    this.editando[uid] = true;
  }

  cancelarEdicion(uid: string) {
    this.editando[uid] = false;
  }

  guardarCambios(uid: string) {
    const datos = this.ediciones[uid];
    this.usuariosService.actualizarUsuario(uid, datos)
      .then(() => {
        console.log('Usuario actualizado');
        this.cancelarEdicion(uid);
      })
      .catch(err => console.error('Error al actualizar usuario', err));
  }
}
