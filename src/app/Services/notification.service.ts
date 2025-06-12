import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject< {message: string, type: string}[]>([])
  notification$ = this.notificationSubject.asObservable();
  constructor() { 
    const savedNotificationSubject = JSON.parse(localStorage.getItem('notification') || '[]');
    this.notificationSubject.next(savedNotificationSubject);
  }

  showNotification(message: string, type: string = 'info', duration: number = 5000) {
    const notification = { message, type };
    const currentNotification = this.notificationSubject.value;
    const updatedNotification = [...currentNotification, notification];

    this.notificationSubject.next(updatedNotification);
    localStorage.setItem('notifications', JSON.stringify(updatedNotification))
    
    setTimeout(() => this.clearNotification(notification), duration)
  }

  clearNotification(notificationToRemove: {message: string; type: string}) {
    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = currentNotifications.filter(notification => notification !== notificationToRemove);

    this.notificationSubject.next(updatedNotifications);
    localStorage.setItem('notidications', JSON.stringify(updatedNotifications));
  }

  markAllsRead() {
    const clearedNotifications = this.notificationSubject.value.map(notification => ({ ...notification, read: true}));
    this.notificationSubject.next(clearedNotifications);
    localStorage.setItem('notifications', JSON.stringify(clearedNotifications));
    localStorage.setItem('notification', JSON.stringify(clearedNotifications));
  }
}