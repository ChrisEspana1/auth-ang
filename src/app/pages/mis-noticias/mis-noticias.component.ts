import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaEvento } from '../../models/noticia-evento.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';// Asumiendo que tienes un servicio de autenticación
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-mis-noticias',
  templateUrl: './mis-noticias.component.html',
  styleUrls: ['./mis-noticias.component.css'],
  imports:[CommonModule]
})
export class MisNoticiasComponent implements OnInit {
  registros: NoticiaEvento[] = [];
  total: number = 0;
  pagina: number = 1;
  porPagina: number = 10;
  uid: string = '';

  constructor(
    private noticiasService: NoticiasService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  const usuario = this.authService.getUsuarioActual() || JSON.parse(localStorage.getItem('usuario') || 'null');
  if (usuario) {
    this.uid = usuario.uid;
    console.log('UID actual:', this.uid);
    this.cargarNoticias();
  } else {
    console.warn('No hay usuario autenticado');
  }
}

  cargarNoticias(): void {
    this.noticiasService.getMisNoticias(this.uid, this.pagina).subscribe({
      next: (res) => {
        this.registros = res.registros;
        this.total = res.total;
      },
      error: (err) => {
        console.error('Error al cargar noticias:', err);
      }
    });
  }

  cambiarPagina(nuevaPagina: number): void {
    this.pagina = nuevaPagina;
    this.cargarNoticias();
  }

  editar(id: number): void {
    this.router.navigate(['/editar-noticia', id]); // Asegúrate de tener esta ruta configurada
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticiaPropia(id).subscribe({
        next: () => {
          this.cargarNoticias();
        },
        error: (err) => {
          console.error('Error al eliminar noticia:', err);
        }
      });
    }
  }
}