import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-claridad-vs-contenido',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './claridad-vs-contenido.component.html',
  styleUrls: ['./claridad-vs-contenido.component.css']
})
export class ClaridadVsContenidoComponent implements OnInit {
  cursos: any[] = [];
  selectedCurso: string = 'todos';

  scatterChartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: {
        display: true,
        text: 'Claridad vs Contenido por Curso',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const raw = context.raw as { curso?: string; x?: number; y?: number } | any;
            const curso = raw?.curso ?? '';
            return `${curso}: Contenido ${raw?.x}, Claridad ${raw?.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Contenido' },
        min: 0,
        max: 5
      },
      y: {
        title: { display: true, text: 'Claridad' },
        min: 0,
        max: 5
      }
    }
  };

  scatterChartData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'Cursos',
        data: [],
        backgroundColor: '#FFCC80'
      }
    ]
  };

  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.reportesService.getClaridadVsContenido().subscribe((data: any[]) => {
      this.cursos = data;
      this.updateChart();
    });
  }

  updateChart(): void {
  // Agrupar por curso_id y calcular promedios
  const agrupado: { [key: number]: { nombre: string; contenido: number[]; claridad: number[] } } = {};

  this.cursos.forEach(item => {
    if (!agrupado[item.curso_id]) {
      agrupado[item.curso_id] = { nombre: item.nombre_curso, contenido: [], claridad: [] };
    }
    agrupado[item.curso_id].contenido.push(item.contenido);
    agrupado[item.curso_id].claridad.push(item.claridad);
  });

  const promedios = Object.entries(agrupado).map(([id, curso]) => ({
    x: curso.contenido.reduce((a, b) => a + b, 0) / curso.contenido.length,
    y: curso.claridad.reduce((a, b) => a + b, 0) / curso.claridad.length,
    curso: curso.nombre
  }));

  // Filtrar si se selecciona un curso específico
  const filtered = this.selectedCurso === 'todos'
    ? promedios
    : promedios.filter(c => c.curso === agrupado[+this.selectedCurso].nombre);

  // Actualizar dataset
  this.scatterChartData.datasets[0].data = filtered;
}

onCursoChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedCurso = selectElement.value;
}

}