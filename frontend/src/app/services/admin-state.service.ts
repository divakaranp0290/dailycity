import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminStateService {

  private citySubject = new BehaviorSubject<string>('chennai');
  city$ = this.citySubject.asObservable();

  setCity(city: string): void {
    this.citySubject.next(city);
  }

  getCity(): string {
    return this.citySubject.value;
  }
}
