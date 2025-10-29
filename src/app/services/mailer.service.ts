// mailer.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MailerService {
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
}
