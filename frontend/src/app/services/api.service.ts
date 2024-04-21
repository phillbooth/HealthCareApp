import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getData() {
    if (this.isBrowser) {
      // Perform HTTP requests with HttpClient
      return this.http.get('/api/data');
    } else {
      // Handle server-side logic or return mock data
      console.log('Server side request for /api/data');
    }
  }


  getChartData(): Observable<any> {
    return this.http.get('/api/appointment-stats');
  }
}
