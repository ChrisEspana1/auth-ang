import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/cursos.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, NgIf]
})
export class CoursesComponent implements OnInit {
  cursos: Curso[] = [];
  nuevoCurso: Curso = this.getCursoVacio();
  cursoEditando: Curso | null = null;
  mostrarFormularioNuevo = false;
  mostrarFormularioEdicion = false;
  cursosPaginados: Curso[] = [];
  paginaActual = 1;
  cursosPorPagina = 8;
  paginas: number[] = [];

  constructor(private cursoService: CursoService, private router: Router) {}

  ngOnInit(): void {
      this.cursosPorPagina = window.innerWidth <= 768 ? 3 : 8;
      this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data;
      this.generarPaginas();
      this.actualizarCursosPaginados();
    });
  }

generarPaginas(): void {
  const totalPaginas = Math.ceil(this.cursos.length / this.cursosPorPagina);
  this.paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
}

actualizarCursosPaginados(): void {
  const inicio = (this.paginaActual - 1) * this.cursosPorPagina;
  const fin = inicio + this.cursosPorPagina;
  this.cursosPaginados = this.cursos.slice(inicio, fin);
}

cambiarPagina(pagina: number): void {
  this.paginaActual = pagina;
  this.actualizarCursosPaginados();
}
  getCursoVacio(): Curso {
    return {
      id: '',
      titulo: '',
      descripcion: '',
      categoria: '',
      nivel: '',
      url_video: ''
    };
  }

  crearCurso(): void {
    if (this.validarCurso(this.nuevoCurso)) {
      this.cursoService.createCurso(this.nuevoCurso).subscribe(() => {
        this.obtenerCursos();
        this.nuevoCurso = this.getCursoVacio();
        this.mostrarFormularioNuevo = false;
      });
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }
irAGestionContenido(id: string): void {
  this.router.navigate(['/admin/content', id]);
}
  editarCurso(curso: Curso): void {
    this.cursoEditando = { ...curso };
    this.mostrarFormularioEdicion = true;
  }

  guardarEdicion(): void {
    if (this.cursoEditando && this.validarCurso(this.cursoEditando)) {
      this.cursoService.updateCurso(this.cursoEditando.id, this.cursoEditando).subscribe(() => {
        this.obtenerCursos();
        this.cursoEditando = null;
        this.mostrarFormularioEdicion = false;
      });
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }

  cancelarEdicion(): void {
    this.cursoEditando = null;
    this.mostrarFormularioEdicion = false;
  }

  validarCurso(curso: Curso): boolean {
    return curso.titulo.trim() !== '' &&
           curso.descripcion.trim() !== '' &&
           curso.categoria.trim() !== '' &&
           curso.nivel.trim() !== '' &&
           curso.url_video.trim() !== '';
  }

  verCurso(id: string): void {
    this.router.navigate(['/curso', id]);
  }
}