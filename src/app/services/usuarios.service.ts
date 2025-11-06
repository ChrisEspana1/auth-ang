import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, setDoc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service'; // Ajusta la ruta si es necesario
import { UserCredential } from '@angular/fire/auth';
import { MailerService } from './mailer.service';
import { getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private mailerService: MailerService
  ) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    return collectionData(usuariosRef, { idField: 'id' }); // 'id' será el UID
  }

  // Crear nuevo usuario con email y contraseña
  crearUsuario(datos: { name: string; email: string; password: string; rol: string; activo: boolean; estado: string }): Promise<void> {
    return this.authService.signUpWithEmailAndPassword({
      email: datos.email,
      password: datos.password
    }).then((cred: UserCredential) => {
      const userRef = doc(this.firestore, `usuarios/${cred.user?.uid}`);
      return setDoc(userRef, {
        id: cred.user?.uid,
        name: datos.name,
        email: datos.email,
        rol: datos.rol,
        activo: datos.activo,
        estado: datos.estado,
        fecha_creacion: Timestamp.fromDate(new Date()),
        fecha_modificacion: Timestamp.fromDate(new Date())
      }).then(() => {
        // Enviar correo de bienvenida
        this.mailerService.enviarCorreoBienvenida(datos.email, datos.name, 'admin');
      });
    });
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

  // Actualizar múltiples campos de un usuario
  actualizarUsuario(uid: string, datos: { name?: string; rol?: string; activo?: boolean, estado?: string }): Promise<void> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(userRef, { ...datos, fecha_modificacion: Timestamp.fromDate(new Date()) });
  }

async obtenerNombrePorUid(uid: string): Promise<string> {
  try {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return data['name'] || 'Sin nombre';
    } else {
      return 'Desconocido';
    }
  } catch (error) {
    console.error('Error al obtener nombre del usuario:', error);
    return 'Error';
  }
}
}