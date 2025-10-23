import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private baseUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  getPromedioCalificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/promedio-calificaciones`);
  }

  getRecomendaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recomendaciones`);
  }

  getClaridadVsContenido(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/claridad-vs-contenido`);
  }
}