import { Component, OnInit, ViewChild,  ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../Services/notification.service';
import { INotification } from '../../interfaces/Notification';
import { Modal, Dropdown } from 'bootstrap';

@Component({
  selector: 'app-notificaton',
  imports: [CommonModule, RouterModule],
  templateUrl: './notificaton.component.html',
  styleUrls: ['./notificaton.component.css']
})
export class NotificatonComponent  implements OnInit, AfterViewInit, OnDestroy {

  notifications: INotification[] = [];
  unreadCount: number = 0;
  modalNotification: INotification | null = null;

  @ViewChild('modal') modalElement!: ElementRef;
  @ViewChild('notificationDropdown') dropdownButtonElement!: ElementRef;
  private bsDropdown!: Dropdown;
  private bsModal!: Modal;
  private listSubscription!: Subscription;
  private modalSubscription!: Subscription;

  constructor(
    private notificationService: NotificationService, 
   private router: Router,
   
  ) {}

  ngOnInit(): void {
     console.log('[DEBUG] ngOnInit: Criando as inscrições (subscriptions)...');
    // 1. ATUALIZAR A LISTA (ESTADO)
    this.listSubscription = this.notificationService.notification$.subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = notifications.filter(n => !n.isRead).length;
    });

    // 2. Assinatura para MOSTRAR O MODAL (EVENTO)
    this.modalSubscription = this.notificationService.modalNotification$.subscribe(notification => {
      if (notification && this.bsModal) {
        console.log('[DEBUG] EVENTO DE MODAL RECEBIDO!', notification);
      console.log('[DEBUG] O modal `bsModal` já está inicializado? Resposta:', this.bsModal);
        this.modalNotification = notification;
        this.bsModal.show();
      } else {
        console.error('[DEBUG] FALHA AO MOSTRAR O MODAL: A condição (notification && this.bsModal) não foi atendida.');
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.modalElement) {
   
      this.bsModal = new Modal(this.modalElement.nativeElement);
    }
    
  
    if (this.dropdownButtonElement) {
      
      this.bsDropdown = new Dropdown(this.dropdownButtonElement.nativeElement);
    }
  }

 
  toggleDropdown(): void {
    if (this.bsDropdown) {
      this.bsDropdown.toggle();
    }
  }


  markAsReadAndClear(notification: INotification): void {
    this.notificationService.markAsRead(notification.id);
    this.notificationService.clearNotification(notification);
  }

  dismissNotification(notification: INotification, event: MouseEvent): void {
    event.stopPropagation(); 
    this.notificationService.clearNotification(notification);
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
    if (this.modalNotification) {
      this.notificationService.clearNotification(this.modalNotification);
    }
  }
  
  ngOnDestroy(): void {
    if (this.listSubscription) this.listSubscription.unsubscribe();
    if (this.modalSubscription) this.modalSubscription.unsubscribe();
  }
}