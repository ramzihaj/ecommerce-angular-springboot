import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isDemoMode) {
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-center text-sm font-medium shadow-lg animate-fade-in">
        <div class="container mx-auto flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>🎨 MODE DÉMO ACTIVÉ - Données de test affichées</span>
          <button 
            (click)="toggleDemoMode()" 
            class="ml-4 px-3 py-1 bg-white/20 hover:bg-white/30 rounded transition text-xs">
            Désactiver
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  `]
})
export class DemoBannerComponent implements OnInit {
  isDemoMode = false;

  ngOnInit() {
    this.isDemoMode = localStorage.getItem('useMocks') === 'true';
  }

  toggleDemoMode() {
    if (this.isDemoMode) {
      localStorage.setItem('useMocks', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('useMocks', 'true');
      window.location.reload();
    }
  }
}
