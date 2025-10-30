import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { NoticiaEvento } from 'src/app/models/noticia-evento.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.css'],
  imports: [CommonModule]
})
export class NewsManagerComponent implements OnInit {
  noticias: NoticiaEvento[] = [];
  tipoSeleccionado: 'noticia' | 'evento' | 'todos' = 'todos';
  mesSeleccionado: string | null = null;
  paginaActual: number = 1;
  totalPaginas: number = 1;
  readonly registrosPorPagina = 3;
  noticiasBackend: NoticiaEvento[] = [];


  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }


actualizarVista(): void {
  const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
  const fin = inicio + this.registrosPorPagina;
  this.noticias = this.noticiasBackend.slice(inicio, fin);
}

cargarNoticias(): void {
  const tipo = this.tipoSeleccionado === 'todos' ? '' : this.tipoSeleccionado;
  this.noticiasService.getNoticiasFiltradas(tipo, this.mesSeleccionado, this.paginaActual)
    .subscribe({
      next: (data: NoticiaEvento[]) => {
        this.noticiasBackend = data;
        this.totalPaginas = Math.ceil(data.length / this.registrosPorPagina);
        this.actualizarVista();
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
      }
    });
}


  cambiarTipo(tipo: 'noticia' | 'evento' | 'todos'): void {
    this.tipoSeleccionado = tipo;
    this.paginaActual = 1;
    this.cargarNoticias();
  }

  filtrarPorMesActual(): void {
    const hoy = new Date();
    const mes = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
    this.mesSeleccionado = mes;
    this.paginaActual = 1;
    this.cargarNoticias();
  }

  verTodas(): void {
    this.mesSeleccionado = null;
    this.paginaActual = 1;
    this.cargarNoticias();
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.cargarNoticias();
    }
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.cargarNoticias();
    }
  }

  eliminarNoticia(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticia(id).subscribe({
        next: () => {
          this.noticias = this.noticias.filter(n => n.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar noticia:', error);
        }
      });
    }
  }
}