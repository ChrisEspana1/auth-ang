import { Injectable } from '@angular/core';

export interface UsuarioSession {
  uid: string;
  nombre: string;
  correo: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private readonly storageKey = 'usuario';

  constructor() {}

  getUsuario(): UsuarioSession | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as UsuarioSession : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUsuario();
  }

  getRol(): string | null {
    // Si guardas el rol en localStorage, puedes accederlo aquí
    const usuario = this.getUsuario();
    return usuario ? (usuario as any).rol || null : null;
  }

  clearSession(): void {
    localStorage.removeItem(this.storageKey);
  }
}