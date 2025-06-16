import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { INotification } from '../interfaces/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  //BehaviorSubject  para gerar a lista de notificações
  private notificationSubject = new BehaviorSubject<INotification[]>([]);
  notification$ = this.notificationSubject.asObservable();
  // Subject para gerar notificações de modal
  private modalNotificationSubject = new Subject<INotification>();
  modalNotification$ = this.modalNotificationSubject.asObservable();

  constructor() {
    const rawNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const savedNotifications = rawNotifications.map((n: INotification) => ({
      ...n,
      timestamp: new Date(n.timestamp)
    }));
    this.notificationSubject.next(savedNotifications);
  }

  showNotification(
    message: string,
    type: 'info' | 'warning' | 'error' = 'info',
    options?: { duration?: number; silent?: boolean; link?: string }
  ): void {
    const notification: INotification = {
      id: Date.now() + Math.random(),
      message,
      type,
      isRead: false,
      timestamp: new Date(),
      link: options?.link,
    };

    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = [...currentNotifications, notification];
    this.notificationSubject.next(updatedNotifications);
    this.saveToLocalStorage(updatedNotifications);

    if (!options?.silent) {
      this.modalNotificationSubject.next(notification);
    }

  }

  clearNotification(notificationToRemove: INotification): void {
    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = currentNotifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    );

    this.notificationSubject.next(updatedNotifications);
    this.saveToLocalStorage(updatedNotifications);
  }

  clearAll(): void {
    this.notificationSubject.next([]);
    this.saveToLocalStorage([]);
  }

  markAsRead(notificationId: number): void {
    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = currentNotifications.map((n) => {
      if (n.id === notificationId) {
        return { ...n, isRead: true };
      }
      return n;
    });
    this.notificationSubject.next(updatedNotifications);
    this.saveToLocalStorage(updatedNotifications);
  }

  markAllAsRead(): void {
    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = currentNotifications.map((n) => ({
      ...n,
      isRead: true,
    }));
    this.notificationSubject.next(updatedNotifications);
    this.saveToLocalStorage(updatedNotifications);
  }

  private saveToLocalStorage(notifications: any[]): void {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }
}
