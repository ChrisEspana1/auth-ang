import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportesService } from '../../services/reportes.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

Chart.register(DataLabelsPlugin);

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
            const raw = context.raw as { curso?: string; x?: number; y?: number };
            return `${raw.curso}: Contenido ${raw.x}, Claridad ${raw.y}`;
          }
        }
      },
      datalabels: {
        align: 'top',
        color: '#6D4C41',
        font: { size: 12, weight: 'bold' },
        formatter: (value: any) => value.curso
      }
    },
    scales: {
      x: { title: { display: true, text: 'Contenido' }, min: 0, max: 5 },
      y: { title: { display: true, text: 'Claridad' }, min: 0, max: 5 }
    }
  };

  scatterChartData: ChartData<'scatter'> = {
    datasets: [{ label: 'Cursos', data: [], backgroundColor: '#FFCC80' }]
  };

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.loadCursos();
    this.loadData();
  }

  loadCursos(): void {
    this.reportesService.getClaridadVsContenido().subscribe((data: any[]) => {
      this.cursos = data; 
    });
  }

  loadData(): void {
    console.log('Cargando datos para:', this.selectedCurso);
    if (this.selectedCurso === 'todos') {
      this.reportesService.getClaridadVsContenido().subscribe((data: any[]) => {
        console.log('Datos recibidos (todos):', data);
        this.graficarDatos(data);
      });
    } else {
      this.reportesService.getClaridadVsContenidoById(+this.selectedCurso).subscribe((data: any[]) => {
        console.log('Datos recibidos (curso específico):', data);
        this.graficarDatos(data);
      });
    }
  }

graficarDatos(data: any[]): void {
  const puntos = data.map(item => ({
    x: Number(item.promedio_contenido),
    y: Number(item.promedio_claridad),
    curso: item.nombre_curso
  }));

  this.scatterChartData = {
    datasets: [
      {
        label: 'Cursos',
        data: puntos,
        backgroundColor: '#FFCC80'
      }
    ]
  };

  console.log('Dataset actualizado:', this.scatterChartData);
}

onCursoChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedCurso = selectElement.value;
  this.loadData();
  console.log('Curso seleccionado (ID):', this.selectedCurso);
}
}