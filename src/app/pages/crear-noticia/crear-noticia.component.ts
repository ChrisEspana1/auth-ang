import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  standalone: true,
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CrearNoticiaComponent {
  formCrear!: FormGroup;
  imagenSeleccionada: File | null = null;

  constructor(private fb: FormBuilder, private noticiasService: NoticiasService) {
    this.formCrear = this.fb.group({
      tipo: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      etiquetas: [''],
      imagen_url: ['']
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  publicar(): void {
    if (this.formCrear.valid) {
      const formData = new FormData();
      formData.append('tipo', this.formCrear.value.tipo);
      formData.append('titulo', this.formCrear.value.titulo);
      formData.append('descripcion', this.formCrear.value.descripcion);
      formData.append('etiquetas', this.formCrear.value.etiquetas);
      if (this.imagenSeleccionada) {
        formData.append('imagen', this.imagenSeleccionada);
      }

      this.noticiasService.crearNoticia(formData).subscribe({
        next: () => alert('Noticia creada correctamente'),
        error: (err) => console.error('Error al crear noticia:', err)
      });
    }
  }
}