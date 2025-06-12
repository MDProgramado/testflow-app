import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NotificationService } from '../Services/notification.service';
import { TaskServiceService } from '../Services/task-service.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notificaton',
  imports: [CommonModule, NgbModalModule],
  templateUrl: './notificaton.component.html',
  styleUrls: ['./notificaton.component.css']
})
export class NotificatonComponent  implements OnInit{

  notifications: any[] = [];
  unreadCount: number = 0;
  notificationMessage: string = '';


  @ViewChild('modal') modal: any;

  constructor(
    private notificationService: NotificationService, 
    private taskService: TaskServiceService,
    @Inject(NgbModal) private modalService: NgbModal 
  ){}

  ngOnInit(): void {
      this.notificationService.notification$.subscribe(notifications => {
        this.notifications = notifications;
        this.unreadCount = notifications.length;
      });

      if(this.notifications.length > 0) {
        this.notificationMessage = this.notifications[this.notifications.length - 1].message;
        this.showNotificationModal();
      }

      this.taskService.tasks$.subscribe(tasks => {
        this.taskService.checkTaskDeadLines(tasks);
      });
  }

  showNotificationModal() {
    this.modalService.open(this.modal);
  }
  markAllAsRead(): void {
    this.unreadCount = 0;
    this.notifications = [];
    this.notificationService.markAllsRead();
  }
}
