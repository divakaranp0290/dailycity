import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  /**
   * City coming from CityToday / Gold / Petrol pages
   * If NOT provided → default to 'chennai'
   */
  @Input() city: string | null = null;

  /** Always-safe city to use in links */
  get activeCity(): string {
    return this.city || 'chennai';
  }
}
