// mailer.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MailerService {
  enviarCorreo(email: string, asunto: string, mensaje: string) {
    throw new Error('Method not implemented.');
  }
  private workerUrl = 'https://agroconecta-worker.agroconecta.workers.dev/';

  constructor(private http: HttpClient) {}

enviarNotificacion(email: string, name: string): Promise<any> {
  return this.http.post(this.workerUrl, { email, name }, { responseType: 'json' }).toPromise()
    .then(response => {
      console.log('[MailerService] Respuesta del Worker:', response);
      return response;
    })
    .catch(error => {
      console.error('[MailerService] Error al enviar notificación:', error);
      throw error;
    });
}

enviarCorreoBienvenida(email: string, name: string, origen: 'admin' | 'oauth'): Promise<any> {
  const payload = { email, name, origen };

  return this.http.post(this.workerUrl, payload, { responseType: 'json' }).toPromise()
    .then(response => {
      console.log('[MailerService] Correo enviado:', response);
      return response;
    })
    .catch(error => {
      console.error('[MailerService] Error al enviar correo:', error);
      throw error;
    });
}

}

