import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { NoticiaEvento } from 'src/app/models/noticia-evento.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-noticia-list',
  templateUrl: './noticia-list.component.html',
  styleUrls: ['./noticia-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NoticiaListComponent implements OnInit {
  noticias: NoticiaEvento[] = [];
  tipoSeleccionado: 'noticia' | 'evento' = 'noticia';
  paginaActual: number = 1;
  totalPaginas: number = 1;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticiasService.getNoticias(this.tipoSeleccionado, this.paginaActual).subscribe(data => {
      this.noticias = data;
      this.totalPaginas = Math.ceil(data.length / 10); // ajusta si el backend devuelve total
    });
  }

  cambiarTipo(tipo: 'noticia' | 'evento'): void {
    this.tipoSeleccionado = tipo;
    this.paginaActual = 1;
    this.cargarNoticias();
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.cargarNoticias();
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.cargarNoticias();
    }
  }
}