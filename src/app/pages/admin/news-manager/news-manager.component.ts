import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { NoticiaEvento } from 'src/app/models/noticia-evento.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class NewsManagerComponent implements OnInit {

  noticias: NoticiaEvento[] = [];
  tipoSeleccionado: 'noticia' | 'evento' | 'todos' = 'todos';
  mesSeleccionado: string | null = null;
  paginaActual: number = 1;
  totalPaginas: number = 1;
  readonly registrosPorPagina = 4;
  noticiasTodas: NoticiaEvento[] = [];
  noticiaSeleccionada: NoticiaEvento | null = null;
  formEdicion!: FormGroup;
  nombresAutores:{[uid: string]:string}={};

  constructor(private noticiasService: NoticiasService, private fb: FormBuilder, private usuariosService: UsuariosService,  private _router: Router) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarTodasNoticias(); // ✅ Llamamos a la función que trae todo
  }

  async cargarTodasNoticias(): Promise<void> {
    const tipo = this.tipoSeleccionado === 'todos' ? '' : this.tipoSeleccionado;
    let pagina = 1;
    let todas: NoticiaEvento[] = [];
    let total = 0;

    do {
      const response = await firstValueFrom(
        this.noticiasService.getNoticiasFiltradas(tipo, this.mesSeleccionado, pagina)
      );
      todas = [...todas, ...response.registros];
      total = response.total;
      pagina++;
    } while (todas.length < total);

    this.noticiasTodas = todas;
    
 // Obtener nombres de autores
  for (const noticia of todas) {
    if (!this.nombresAutores[noticia.autor_uid]) {
      const nombre = await this.usuariosService.obtenerNombrePorUid(noticia.autor_uid);
      this.nombresAutores[noticia.autor_uid] = nombre;
    }
  }

    this.totalPaginas = Math.ceil(todas.length / this.registrosPorPagina);
    this.actualizarVista();
  }

  inicializarFormulario(): void {
    this.formEdicion = this.fb.group({
      tipo: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      imagen_url: [''],
      etiquetas: ['']
    });
  }

  actualizarVista(): void {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.noticias = this.noticiasTodas.slice(inicio, fin);
  }

  editarNoticia(noticia: NoticiaEvento): void {
    console.log('Datos de la noticia seleccionada:', noticia);
    this.noticiaSeleccionada = noticia;
    this.formEdicion.patchValue({
      tipo: noticia.tipo,
      titulo: noticia.titulo,
      descripcion: noticia.descripcion || '',
      imagen_url: noticia.imagen_url || '',
      etiquetas: noticia.etiquetas || ''
    });
  }

  guardarCambios(): void {
    if (this.formEdicion.valid && this.noticiaSeleccionada) {
      const datosActualizados = this.formEdicion.value;
      this.noticiasService.actualizarNoticia(this.noticiaSeleccionada.id, datosActualizados)
        .subscribe({
          next: () => {
            Object.assign(this.noticiaSeleccionada!, datosActualizados);
            this.cerrarModal();
          },
          error: (error) => console.error('Error al actualizar noticia:', error)
        });
    }
  }

  cerrarModal(): void {
    this.noticiaSeleccionada = null;
    this.formEdicion.reset();
  }

  cambiarTipo(tipo: 'noticia' | 'evento' | 'todos'): void {
    this.tipoSeleccionado = tipo;
    this.paginaActual = 1;
    this.cargarTodasNoticias(); // ✅ Recarga todas las noticias
  }

  filtrarPorMesActual(): void {
    const hoy = new Date();
    const mes = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
    this.mesSeleccionado = mes;
    this.paginaActual = 1;
    this.cargarTodasNoticias();
  }

  verTodas(): void {
    this.mesSeleccionado = null;
    this.paginaActual = 1;
    this.cargarTodasNoticias();
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarVista();
    }
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarVista();
    }
  }
  RedirectToCrearNoticia() {
  this._router.navigate(['/crear-noticia']);
  }

  eliminarNoticia(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticia(id).subscribe({
        next: () => {
          this.noticiasTodas = this.noticiasTodas.filter(n => n.id !== id);
          this.actualizarVista();
        },
        error: (error) => console.error('Error al eliminar noticia:', error)
      });
    }
  }
}