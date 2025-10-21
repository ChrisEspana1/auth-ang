import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://192.168.1.214:3000/api/feedback'; // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  enviarFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
  validarAcceso(data: { cursoId: number; correo: string }) {
    return this.http.post(`${this.apiUrl}/validar-acceso`, data);
  }


}