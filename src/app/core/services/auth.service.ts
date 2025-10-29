import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, Timestamp } from '@angular/fire/firestore';
import { MailerService } from 'src/app/services/mailer.service';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  readonly authState$ = authState(this.auth);
  private usuarioActual: { nombre: string; correo: string } | null = null;
  private mailerService: MailerService = inject(MailerService);

  getUsuarioActual(): { nombre: string; correo: string } | null {
    return this.usuarioActual;
  }
  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  // providers

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();

    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      const userRef = doc(this.firestore, `usuarios/${user.uid}`);
      const snapshot = await getDoc(userRef);

      this.usuarioActual = {
        nombre: user.displayName || '',
        correo: user.email || ''
      };


      if (!snapshot.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          rol: 'estudiante',
          activo: false,
          fecha_creacion: Timestamp.fromDate(new Date())
        });

        try {
          await this.mailerService.enviarNotificacion(user.email || '', user.displayName || '');
          alert('Bienvenido a AgroConecta! Tu cuenta ha sido creada exitosamente.');
          alert('Se ha enviado una notificación a tu correo electrónico.');
        } catch (error) {
          alert('Tu cuenta fue creada, pero hubo un error al enviar el correo de notificación.');
        }
      }


      return result;
    } catch (error: any) {
      return error;
    }
  }
}

