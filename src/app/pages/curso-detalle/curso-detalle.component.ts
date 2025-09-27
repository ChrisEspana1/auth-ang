import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/cursos.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import HomeComponent from '../home/home.component';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { Contenido } from 'src/app/models/contenido.model';

@Component({
  standalone: true,
  imports: [CommonModule, HomeComponent, SafeUrlPipe],
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})

export class CursoDetalleComponent implements OnInit {
  curso: Curso | null = null;
  contenidos: Contenido[];

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private http: HttpClient
  ) {
    this.contenidos = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoService.getCursoPorId(id).subscribe(data => {
        this.curso = data;
      });

      this.cursoService.getContenidosPorCurso(id).subscribe(data => {
        this.contenidos = data;
      });

    }
  }
}
