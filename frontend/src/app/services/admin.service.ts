import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private API = 'http://localhost:3000/api/admin';
  private ADMIN_TOKEN = 'supersecret123'; // move to env later

  constructor(private http: HttpClient) {}

  updateCityToday(payload: any) {
    const headers = new HttpHeaders({
      'x-admin-token': this.ADMIN_TOKEN
    });

    return this.http.post(
      `${this.API}/city/update`,
      payload,
      { headers }
    );
  }
}
