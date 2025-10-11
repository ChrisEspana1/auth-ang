import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(private firestore: Firestore) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    return collectionData(usuariosRef, { idField: 'id' }); // 'id' será el UID
  }

  // Actualizar el rol de un usuario
  actualizarRol(uid: string, nuevoRol: string): Promise<void> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(userRef, { rol: nuevoRol });
  }

  // Activar o desactivar un usuario
  actualizarEstado(uid: string, activo: boolean): Promise<void> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(userRef, { activo });
  }
  
  actualizarUsuario(uid: string, datos: { name?: string; rol?: string; activo?: boolean }): Promise<void> {
  const userRef = doc(this.firestore, `usuarios/${uid}`);
  return updateDoc(userRef, datos);
}
}