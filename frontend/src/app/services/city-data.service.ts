import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityDataService {

  private API_BASE = 'https://dailycity.onrender.com/api';
// API_BASE = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getCityToday(city: string): Observable<any> {
    return this.http.get(`${this.API_BASE}/${city}/today`);
  }
}
