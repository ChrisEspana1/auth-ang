import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/comentario.model';
import { NoticiaEvento } from 'src/app/models/noticia-evento.model';
import { NoticiasService } from 'src/app/services/noticias.service';
import { UserSessionService, UsuarioSession } from 'src/app/services/user-session.service';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  selector: 'app-noticia-detail',
  templateUrl: './noticia-detail.component.html',
  styleUrls: ['./noticia-detail.component.css']
})
export class NoticiaDetailComponent implements OnInit {
  noticia: NoticiaEvento | null = null;
  comentarios: Comentario[] = [];
  nuevoComentarioTexto: string = '';
  usuario: UsuarioSession | null = null;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private userSession: UserSessionService,
    private comentariosService: ComentariosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.noticiasService.getNoticiaPorId(id).subscribe(data => {
      this.noticia = data;
      this.usuario = this.userSession.getUsuario();
      if (this.usuario) {
        console.log('Usuario actual:', this.usuario.nombre);
      }
      this.cargarComentarios();
    });
  }

  cargarComentarios(): void {
    if (!this.noticia) return;
    this.comentariosService.getComentariosPorNoticia(this.noticia.id!).subscribe(data => {
      this.comentarios = data;
    });
  }

  comentar(texto: string): void {
    if (!this.usuario || !this.noticia) return;

    const comentario: Comentario = {
      noticia_id: this.noticia.id!,
      autor_nombre: this.usuario.nombre,
      contenido: texto,
      fecha_creacion: new Date().toString()
    };

    this.comentariosService.crearComentario(comentario).subscribe(() => {
      this.nuevoComentarioTexto = '';
      this.cargarComentarios();
    });
  }

  anotarse(): void {
    // lógica para registrar usuario al evento
  }

  compartir(red: string): void {
    // lógica para compartir en redes
  }
}