import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  constructor() {}

  success(message: string, duration: number = 3000): void {
    this.show({
      id: this.generateId(),
      type: 'success',
      message,
      duration
    });
  }

  error(message: string, duration: number = 5000): void {
    this.show({
      id: this.generateId(),
      type: 'error',
      message,
      duration
    });
  }

  info(message: string, duration: number = 3000): void {
    this.show({
      id: this.generateId(),
      type: 'info',
      message,
      duration
    });
  }

  warning(message: string, duration: number = 4000): void {
    this.show({
      id: this.generateId(),
      type: 'warning',
      message,
      duration
    });
  }

  private show(notification: Notification): void {
    this.notificationSubject.next(notification);
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
