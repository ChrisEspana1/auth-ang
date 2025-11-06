import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaEvento } from '../../models/noticia-evento.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-mis-noticias',
  templateUrl: './mis-noticias.component.html',
  styleUrls: ['./mis-noticias.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class MisNoticiasComponent implements OnInit {
  registros: NoticiaEvento[] = [];
  total: number = 0;
  pagina: number = 1;
  porPagina: number = 10;
  uid: string = '';
  noticiaSeleccionada: NoticiaEvento | null = null;
  formEdicion!: FormGroup;

  constructor(
    private noticiasService: NoticiasService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioActual() || JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuario) {
      this.uid = usuario.uid;
      this.inicializarFormulario();
      this.cargarNoticias();
    }
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
  const noticia = this.registros.find(n => n.id === id);
  if (noticia) {
    this.noticiaSeleccionada = noticia;

    this.formEdicion.patchValue({
      tipo: noticia.tipo,
      titulo: noticia.titulo,
      descripcion: noticia.descripcion || '',
      imagen_url: noticia.imagen_url || '',
      etiquetas: Array.isArray(noticia.etiquetas) ? noticia.etiquetas.join(', ') : ''
    });
  }
}

guardarCambios(): void {
  if (this.formEdicion.valid && this.noticiaSeleccionada) {
    const datosActualizados = {
      ...this.formEdicion.value,
      etiquetas: this.formEdicion.value.etiquetas.split(',').map((e: string) => e.trim()),
      fecha_evento: this.noticiaSeleccionada.fecha_evento || null
    };

    this.noticiasService.actualizarNoticia(this.noticiaSeleccionada.id, datosActualizados).subscribe({
      next: () => {
        Object.assign(this.noticiaSeleccionada!, datosActualizados);
        this.cerrarEdicion();
      },
      error: (error) => console.error('Error al actualizar noticia:', error)
    });
  }
}

  cerrarEdicion(): void {
    this.noticiaSeleccionada = null;
    this.formEdicion.reset();
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticiaPropia(id).subscribe({
        next: () => {
          this.registros = this.registros.filter(n => n.id !== id);
          this.total--;
        },
        error: (err) => {
          console.error('Error al eliminar noticia:', err);
        }
      });
    }
  }
}