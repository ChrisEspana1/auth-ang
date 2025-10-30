import { Component, OnInit } from '@angular/core';
import { NoticiaEvento } from 'src/app/models/noticia-evento.model';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias-event',
  templateUrl: './noticias-event.component.html',
  styleUrls: ['./noticias-event.component.scss']
})
export class NoticiasEventComponent implements OnInit {
  noticias: NoticiaEvento[] = [];
  filtroTipo: 'noticia' | 'evento' | 'todos' = 'todos';
  filtroEtiqueta: string = '';
  filtroFecha: Date | null = null;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticiasService.getNoticias().subscribe(data => {
      this.noticias = data;
    });
  }

  aplicarFiltros(): void {
    // Aquí puedes aplicar lógica para filtrar por tipo, etiquetas y fecha
  }

  verDetalle(id: number): void {
    // Navegar a /news/:id
  }
}
