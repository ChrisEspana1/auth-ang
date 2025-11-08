import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoticiaEvento } from '../models/noticia-evento.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'https://api.agroconecta.site/api/news-events';
  private apiUrlFilter = 'https://api.agroconecta.site/api/news-events/filter';
  private apiUrlId = 'https://api.agroconecta.site/api/news-events';

  constructor(private http: HttpClient) {}

  // ✅ Obtener noticias paginadas simples (filter)
  getNoticias(tipo: string, pagina: number): Observable<NoticiaEvento[]> {
    return this.http.get<NoticiaEvento[]>(`${this.apiUrlFilter}?tipo=${tipo}&pagina=${pagina}`);
  }

getMisNoticias(uid: string, pagina: number): Observable<{ registros: NoticiaEvento[], total: number }> {
  return this.http.get<{ registros: NoticiaEvento[], total: number }>(
    `${this.apiUrl}/mine?uid=${uid}&pagina=${pagina}`
  );
}


  // ✅ Obtener noticia por ID
  getNoticiaPorId(id: number): Observable<NoticiaEvento> {
    return this.http.get<NoticiaEvento>(`${this.apiUrlId}/${id}/event`);
  }

  // ✅ Crear noticia
  crearNoticia(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ✅ Eliminar noticia
  eliminarNoticia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  eliminarNoticiaPropia(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/mine/${id}`);
}

  // ✅ Obtener noticias filtradas con total (usa endpoint principal)
  getNoticiasFiltradas(
    tipo: string,
    mes: string | null,
    pagina: number
  ): Observable<{ registros: NoticiaEvento[], total: number }> {
    let url = `${this.apiUrl}?pagina=${pagina}`;
    if (tipo) url += `&tipo=${tipo}`;
    if (mes) url += `&mes=${mes}`;
    return this.http.get<{ registros: NoticiaEvento[], total: number }>(url);
  }

  // ✅ Actualizar noticia
  actualizarNoticia(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  
}
