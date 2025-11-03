import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
      @for (notification of notifications; track notification.id) {
        <div 
          [@slideIn]
          [ngClass]="getNotificationClass(notification.type)"
          class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-elegant-lg backdrop-blur-sm border">
          <mat-icon class="flex-shrink-0">{{ getIcon(notification.type) }}</mat-icon>
          <p class="flex-1 text-sm font-medium">{{ notification.message }}</p>
          <button 
            (click)="removeNotification(notification.id)"
            class="flex-shrink-0 hover:opacity-70 transition-opacity">
            <mat-icon class="text-sm">close</mat-icon>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationToastComponent implements OnInit {
  private notificationService = inject(NotificationService);
  
  notifications: Notification[] = [];
  private timeouts = new Map<string, any>();

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notification => {
      this.notifications.push(notification);
      
      // Auto-dismiss after duration
      if (notification.duration) {
        const timeout = setTimeout(() => {
          this.removeNotification(notification.id);
        }, notification.duration);
        this.timeouts.set(notification.id, timeout);
      }
    });
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    
    // Clear timeout if exists
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
  }

  getNotificationClass(type: string): string {
    const baseClass = 'text-white';
    switch (type) {
      case 'success':
        return `${baseClass} bg-green-500/90 border-green-400`;
      case 'error':
        return `${baseClass} bg-red-500/90 border-red-400`;
      case 'warning':
        return `${baseClass} bg-amber-500/90 border-amber-400`;
      case 'info':
      default:
        return `${baseClass} bg-blue-500/90 border-blue-400`;
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  }

  ngOnDestroy() {
    // Clear all timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
  }
}
