
import { ApiService } from '../services/api.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import 'chartjs-adapter-moment';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import 'zone.js';
import 'chartjs-adapter-moment';
import Chart from 'chart.js/auto';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<{[key: string]: number}>('http://127.0.0.1:8000/api/appointment-stats').subscribe(data => {
      const labels = Object.keys(data);
      const series = Object.values(data);
      this.initChart(labels, series);
    });
  }

  ngAfterViewInit(): void {
    // This will be called after the view is initialized and the `canvas` is available
  }

  initChart(labels: string[], series: number[]): void {
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: series,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        animation: {
        }
      }
    };
    if (this.canvas.nativeElement && !this.chart) {
      this.chart = new Chart(this.canvas.nativeElement, config);
    } else {
      this.chart!.data.labels = labels;
      this.chart!.data.datasets[0].data = series;
      this.chart!.update();
    }
  }
}