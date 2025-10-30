import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoticiaEvento } from '../models/noticia-evento.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'http://localhost:3000/api/news-events';

  constructor(private http: HttpClient) {}

 getNoticias(tipo: string, pagina: number): Observable<NoticiaEvento[]> {
  return this.http.get<NoticiaEvento[]>(`${this.apiUrl}?tipo=${tipo}&pagina=${pagina}`);
}

  getNoticiaPorId(id: number): Observable<NoticiaEvento> {
    return this.http.get<NoticiaEvento>(`${this.apiUrl}/${id}`);
  }

  crearNoticia(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  eliminarNoticia(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
getNoticiasFiltradas(tipo: string, mes: string | null, pagina: number): Observable<NoticiaEvento[]> {
  let url = `${this.apiUrl}?tipo=${tipo}&pagina=${pagina}`;
  if (mes) {
    url += `&mes=${mes}`; // mes en formato 'YYYY-MM'
  }
  return this.http.get<NoticiaEvento[]>(url);
}
  
}
