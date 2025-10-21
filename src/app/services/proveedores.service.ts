import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';


@Injectable({ providedIn: 'root' })
export class ProveedoresService {
    private apiUrl = 'http://192.168.1.214:3000/api/proveedores';
    constructor(private http: HttpClient) {}

    getTodosLosProveedores(): Observable<Proveedor[]> {
        return this.http.get<Proveedor[]>(this.apiUrl);
    }

    actualizarProveedor(cursoId: string, proveedorId: number, datos: Partial<Proveedor>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${cursoId}/proveedores/${proveedorId}`, datos);
    }

    crearProveedor(cursoId: string, datos: Partial<Proveedor>): Observable<any> {
        return this.http.post(`${this.apiUrl}/${cursoId}/proveedores`, datos);
    }
    cambiarEstadoProveedor(cursoId: string, proveedorId: number, nuevoEstado: number): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${cursoId}/proveedores/${proveedorId}/estado`, { activo: nuevoEstado });
    }

    inhabilitarProveedor(cursoId: string, proveedorId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${cursoId}/proveedores/${proveedorId}`);
    }



}