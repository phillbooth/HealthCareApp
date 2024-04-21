import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Input() chartData: ChartData<'doughnut'>;
export class HomeComponent implements OnInit {
  // Chart data structures
  public pieChartOptions: ChartOptions = {
    responsive: true,
    // other options if needed
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.apiService.getChartData().subscribe({
      next: (data) => {
        this.pieChartLabels = data.labels; // assuming 'data.labels' is an array of labels
        this.pieChartData = data.values; // assuming 'data.values' is an array of values
        console.log('Chart data loaded:', data);
      },
      error: (error) => {
        console.error('Failed to load chart data:', error);
      }
    });
  }
}
