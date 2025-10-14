import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Contenido } from 'src/app/models/contenido.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ContentComponent implements OnInit {
  cursoId!: string;
  contenidos: Contenido[] = [];
  nuevoContenido: Contenido = {
    id: 0,
    curso_id: '',
    titulo: '',
    descripcion: '',
    url_recurso: ''
  };

  constructor(private route: ActivatedRoute, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.paramMap.get('id')!;
    this.nuevoContenido.curso_id = this.cursoId;
    this.cargarContenidos();
  }

  cargarContenidos(): void {
    this.cursoService.getContenidosPorCurso(this.cursoId).subscribe({
      next: (data) => this.contenidos = data,
      error: (err) => console.error('Error al cargar contenidos', err)
    });
  }

  agregarContenido(): void {
    // Aquí se agregaría la lógica POST cuando el backend esté listo
    const nuevo = { ...this.nuevoContenido, curso_id: this.cursoId.toString() };
    this.contenidos.push(nuevo);
    this.nuevoContenido = {
      id: 0,
      curso_id: this.cursoId.toString(),
      titulo: '',
      descripcion: '',
      url_recurso: ''
    };
  }

  modificarContenido(index: number): void {
    // Aquí se agregaría la lógica PUT cuando el backend esté listo
    alert(`Contenido modificado: ${this.contenidos[index].titulo}`);
  }
  
}