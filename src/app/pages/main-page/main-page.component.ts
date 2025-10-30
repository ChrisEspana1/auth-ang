import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { NoticiasService } from 'src/app/services/noticias.service';
import { NoticiaEvento } from 'src/app/models/noticia-evento.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  cursosDestacados: any[] = [];
  noticiasRecientes: NoticiaEvento[] = [];

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private noticiasService: NoticiasService
  ) { }

ngOnInit(): void {
  this.feedbackService.getCursosRecomendados().subscribe(data => {
    this.cursosDestacados = data.slice(0, 3); // Mostrar solo los 3 primeros

    this.noticiasService.getNoticias('noticia', 1).subscribe(data => {
      this.noticiasRecientes = data.slice(0, 3); // Mostrar solo las 3 más recientes
    });
  });
}

  verCurso(id: number): void {
      this.router.navigate(['/curso', id]);
    }
}
