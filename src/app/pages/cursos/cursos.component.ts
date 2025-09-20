import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/cursos.model';
import { Router } from '@angular/router';
import HomeComponent from '../home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [HomeComponent, CommonModule, HttpClientModule],
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  cursosPaginados: Curso[] = [];
  paginaActual = 1;
  cursosPorPagina = 4;
  paginas: number[] = [];

  constructor(private cursoService: CursoService, private router: Router) {}

  ngOnInit(): void {
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

  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.actualizarCursosPaginados();
  }

  verCurso(id: string): void {
    this.router.navigate(['/curso', id]);
  }
}
