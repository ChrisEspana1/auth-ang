import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticia-form',
  templateUrl: './noticia-form.component.html',
  styleUrls: ['./noticia-form.component.scss']
})
export class NoticiaFormComponent implements OnInit {
  form: FormGroup;
  imagenPreview: string | null = null;

  constructor(private fb: FormBuilder, private noticiasService: NoticiasService) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null],
      etiquetas: [''],
      tipo: ['noticia', Validators.required],
      fecha_evento: [null]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    // lógica para mostrar preview y subir imagen
  }

  submit(): void {
    if (this.form.valid) {
      const noticia = this.form.value;
      this.noticiasService.crearNoticia(noticia).subscribe(res => {
        // redirigir o mostrar mensaje
      });
    }
  }
}

