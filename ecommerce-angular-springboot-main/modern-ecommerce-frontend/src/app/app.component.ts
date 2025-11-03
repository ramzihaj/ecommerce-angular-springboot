import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { DemoBannerComponent } from './core/components/demo-banner/demo-banner.component';
import { NotificationToastComponent } from './shared/components/notification-toast/notification-toast.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, DemoBannerComponent, NotificationToastComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-demo-banner></app-demo-banner>
      <app-navbar></app-navbar>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      
      <!-- Notifications Toast -->
      <app-notification-toast></app-notification-toast>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}
