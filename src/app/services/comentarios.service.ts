import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'https://api.agroconecta.site/api/comentarios';

  constructor(private http: HttpClient) {}

  // Obtener comentarios por noticia/evento
  getComentariosPorNoticia(noticiaId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/${noticiaId}`);
  }
  

  // Crear nuevo comentario
  crearComentario(comentario: Comentario): Observable<any> {
    return this.http.post(this.apiUrl, comentario);
  }
}