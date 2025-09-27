import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos.model';
import { Contenido } from '../models/contenido.model';
import { Proveedor } from '../models/proveedor.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private apiUrl = 'http://localhost:3000/api/cursos';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }
  getCursoPorId(id: string): Observable<Curso> {
  return this.http.get<Curso>(`${this.apiUrl}/${id}`);
}
getContenidosPorCurso(id: string): Observable<Contenido[]> {
  return this.http.get<Contenido[]>(`${this.apiUrl}/${id}/contenidos`);
}

getProveedoresPorCurso(id: string): Observable<Proveedor[]> {
  return this.http.get<Proveedor[]>(`${this.apiUrl}/${id}/proveedores`);
}
}
