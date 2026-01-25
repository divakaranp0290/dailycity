import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CityDataService {

  private API_BASE = 'https://dailycity.onrender.com/api';
  // Local: http://localhost:3000/api

  constructor(private http: HttpClient) { }

  getCityToday(city: string) {
    return this.http
      .get<{ data: any }>(`${this.API_BASE}/${city}/today`)
      .pipe(map(res => res.data));
  }

}
