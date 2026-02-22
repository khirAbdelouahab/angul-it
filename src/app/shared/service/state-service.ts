import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // Save state
  saveState(key: string, data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  // Load state
  loadState(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  // Clear state
  clearState(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // Clear all
  clearAllState(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}