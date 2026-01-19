import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CityDataService {

  private API_BASE = 'https://dailycity.onrender.com/api';
  // Local: http://localhost:3000/api

  constructor(private http: HttpClient) {}

  getCityToday(city: string) {
    return this.http.get<any>(`${this.API_BASE}/${city}/today`);
  }
}
