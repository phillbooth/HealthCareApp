
import { ApiService } from '../services/api.service';
import 'chartjs-adapter-moment';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import 'zone.js';
import 'chartjs-adapter-moment';
import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration,  ChartData,  ChartType , CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ScatterController } from 'chart.js';

// Register components including scatter controller
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ScatterController);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('chartCanvas1') chartCanvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartCanvas2') chartCanvas2!: ElementRef<HTMLCanvasElement>;
  chart1: Chart | undefined;
  chart2: Chart | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDataChart1();
    this.fetchDataChart2();
  }

  fetchDataChart1(): void {
    this.http.get<{[key: string]: number}>('http://127.0.0.1:8000/api/appointment-type-percentages').subscribe(data => {
      const labels = Object.keys(data);
      const series = Object.values(data);
      this.initChart1(labels, series);
    });
  }

  fetchDataChart2(): void {
    this.http.get<{doctor: string, avgLength: number}[]>('http://127.0.0.1:8000/api/average-appointment-lengths').subscribe(data => {
      const chartData = Object.entries(data).map(([doctor, avgLength]) => ({ x: doctor, y: avgLength }));
      const labels = Object.keys(data);
      this.initChart2(labels, chartData);
    });
  }

  initChart2(labels: string[], chartData: any[]): void {
    const config: ChartConfiguration = {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Average Appointment Length by Doctor',
          data: chartData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            labels: labels,
            title: {
              display: true,
              text: 'Doctors'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Average Appointment Length (minutes)'
            }
          }
        }
      }
    };

    if (this.chartCanvas2) {
      this.chart2 = new Chart(this.chartCanvas2.nativeElement, config);
    }
  }


    
  ngAfterViewInit(): void {
    // This will be called after the view is initialized and the `canvas` is available
  }

  initChart1(labels: string[], series: number[]): void {
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
    if (this.chartCanvas1.nativeElement && !this.chart1) {
      this.chart1 = new Chart(this.chartCanvas1.nativeElement, config);
    } else {
      this.chart1!.data.labels = labels;
      this.chart1!.data.datasets[0].data = series;
      this.chart1!.update();
    }
  }
}