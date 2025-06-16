import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject< {message: string, type: string, dismissed: boolean}[]>([])
  notification$ = this.notificationSubject.asObservable();
  constructor() { 
    const savedNotificationSubject = JSON.parse(localStorage.getItem('notification') || '[]');
    this.notificationSubject.next(savedNotificationSubject);
  }

  showNotification(message: string, type: string = 'info', duration: number = 5000, dismissed: boolean = false) {
    const notification = { message, type,  dismissed};
    const currentNotification = this.notificationSubject.value;
    const updatedNotification = [...currentNotification, notification];

    this.notificationSubject.next(updatedNotification);
    localStorage.setItem('notifications', JSON.stringify(updatedNotification))
    
    setTimeout(() => this.clearNotification(notification), duration)
  }

  clearNotification(notificationToRemove: {message: string; type: string, dismissed: boolean, read?: boolean}) {
    if(!notificationToRemove.dismissed || notificationToRemove.read){

      const currentNotifications = this.notificationSubject.value;
      const updatedNotifications = currentNotifications.filter(notification => notification !== notificationToRemove);
  
      this.notificationSubject.next(updatedNotifications);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    }
  }

  markAllsRead() {
    const clearNotifications = this.notificationSubject.value.map(notification => ({
      ...notification,
      read: true
    }));
    this.notificationSubject.next(clearNotifications);
    localStorage.setItem('notifications', JSON.stringify(clearNotifications));
  }
}