import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-noticia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent implements OnInit {
  formCrear!: FormGroup;
  publicando = false;
  mensaje = '';
  error = '';
  uid: string = '';

  constructor(
    private fb: FormBuilder,
    private noticiasService: NoticiasService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioActual() || JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuario) {
      this.uid = usuario.uid;
    }

    this.formCrear = this.fb.group({
      tipo: ['noticia', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      imagen_url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i)]],
      etiquetas: [''],
      fecha_evento: ['']
    });
  }

  publicar(): void {
    if (this.formCrear.invalid || !this.uid) {
      this.error = 'No se puede publicar sin autenticación.';
      return;
    }

    this.publicando = true;
    this.mensaje = '';
    this.error = '';

    const formData = this.formCrear.value;

    const etiquetasArray = formData.etiquetas
      ? formData.etiquetas.split(',').map((e: string) => e.trim()).filter((e: string) => e)
      : [];

    const payload: any = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      imagen_url: formData.imagen_url,
      etiquetas: etiquetasArray,
      tipo: formData.tipo,
      autor_uid: this.uid
    };

    if (formData.tipo === 'evento' && formData.fecha_evento) {
      payload.fecha_evento = formData.fecha_evento;
    }

    this.noticiasService.crearNoticia(payload).subscribe({
      next: (res: any) => {
        this.mensaje = res.message || 'Contenido publicado exitosamente.';
        this.formCrear.reset({ tipo: 'noticia' });
        this.publicando = false;

        // Recargar el componente
        setTimeout(() => {
          this.location.go(this.location.path());
          window.location.reload();
        }, 1000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Ocurrió un error al publicar.';
        this.publicando = false;
      }
    });
  }
}