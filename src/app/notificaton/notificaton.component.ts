import { Component, OnInit, ViewChild,  ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../Services/notification.service';
import { TaskServiceService } from '../Services/task-service.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { RouterModule } from '@angular/router';
import { Task } from '../interfaces/Task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notificaton',
  imports: [CommonModule, RouterModule],
  templateUrl: './notificaton.component.html',
  styleUrls: ['./notificaton.component.css']
})
export class NotificatonComponent  implements OnInit, AfterViewInit, OnDestroy {

  notifications: any[] = [];
  unreadCount: number = 0;
  notificationMessage: string = '';

  @ViewChild('modal') modalElement!: ElementRef;
  private bsModal!: Modal;
  private notificationsSubscription!: Subscription;

  constructor(
    private notificationService: NotificationService, 
    private taskService: TaskServiceService
  ) {}

  ngOnInit(): void {
    // Assinatura para as notificações
    this.notificationsSubscription = this.notificationService.notification$.subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = notifications.length;

      // Lógica para mostrar o modal se houver notificações
      if (this.notifications.length > 0) {
        this.notificationMessage = this.notifications[this.notifications.length - 1].message;
      }
    });
  }

  ngAfterViewInit(): void {
    // Inicializa o modal após a visualização ser totalmente carregada
    if (this.modalElement) {
      this.bsModal = new Modal(this.modalElement.nativeElement);
      
      // Se houver notificações, mostra o modal
      if (this.notifications.length > 0) {
        this.showNotificationModal();
      }
    }
  }

  showNotificationModal(): void {
    if (this.bsModal) {
      this.bsModal.show();
    }
  }

  markAllAsRead(): void {
    this.unreadCount = 0;
    this.notifications = [];
    this.notificationService.markAllsRead();
  }

  getNotificationClass(type: string): string {
    switch (type) {
      case 'info':
        return 'bi-info-circle-fill text-primary';
      case 'warning':
        return 'bi-exclamation-triangle-fill text-warning';
      case 'error':
        return 'bi-x-octagon-fill text-danger';
      default:
        return '';
    }
  }

  // Cancelando a assinatura quando o componente for destruído
  ngOnDestroy(): void {
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }
}