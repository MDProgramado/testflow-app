import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Modal, Dropdown } from 'bootstrap';
import { Subscription } from 'rxjs';
import { INotification } from '../../interfaces/Notification';
import { NotificationService } from '../../Services/notification.service';


@Component({
  selector: 'app-notificaton',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notificaton.component.html',
  styleUrls: ['./notificaton.component.css']
})
export class NotificatonComponent implements OnInit, AfterViewInit, OnDestroy {

  notifications: INotification[] = [];
  unreadCount: number = 0;
  modalNotification: INotification | null = null;

  @ViewChild('notificationDropdown') dropdownButtonElement!: ElementRef;
  @ViewChild('modal') modalElement!: ElementRef;
  
  private bsDropdown!: Dropdown;
  private bsModal!: Modal;
  private listSubscription!: Subscription;
  private modalSubscription!: Subscription;

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listSubscription = this.notificationService.notification$.subscribe(notifications => {
      const sortedNotifications = notifications.sort((a, b) => b.timestamp - a.timestamp);
      this.notifications = sortedNotifications;
      this.unreadCount = notifications.filter(n => !n.isRead).length;
    });

    this.modalSubscription = this.notificationService.modalNotification$.subscribe(notification => {
      if (notification && this.bsModal) {
        this.modalNotification = notification;
        this.bsModal.show();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.modalElement) {
      // @ts-ignore
      this.bsModal = new bootstrap.Modal(this.modalElement.nativeElement);
    }
    
    if (this.dropdownButtonElement) {
      // @ts-ignore
      this.bsDropdown = new bootstrap.Dropdown(this.dropdownButtonElement.nativeElement);
    }
  }


  clearAllNotifications(): void {
   
    this.notificationService.markAllAsRead();
  }

  toggleDropdown(): void {
    if (this.bsDropdown) {
      this.bsDropdown.toggle();
    }
  }

  markAsReadAndClear(notification: INotification): void {
    if (!notification.id) return;
    this.notificationService.markAsRead(notification.id);
    // CORREÇÃO 2: Passe apenas o ID (string)
    this.notificationService.clearNotification(notification.id);
  }

  dismissNotification(notification: INotification, event: MouseEvent): void {
    event.stopPropagation();
    if (!notification.id) return; 
   
    this.notificationService.clearNotification(notification.id);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead(); 
  }

  getNotificationClass(type: string): string {
    switch (type) {
      case 'info': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'error': return 'text-danger';
      default: return 'text-secondary';
    }
  }

  onModalOkClick(): void {
    if (this.modalNotification && this.modalNotification.id) {
      // CORREÇÃO 4: Passe apenas o ID (string)
      this.notificationService.clearNotification(this.modalNotification.id);
    }
  }
  
  ngOnDestroy(): void {
    if (this.listSubscription) this.listSubscription.unsubscribe();
    if (this.modalSubscription) this.modalSubscription.unsubscribe();
  }
}