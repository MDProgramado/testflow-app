import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, from, Observable } from 'rxjs';
import { INotification } from '../interfaces/Notification';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, query, where, QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private db: Firestore = inject(Firestore);


  private notificationSubject = new BehaviorSubject<INotification[]>([]);
  notification$ = this.notificationSubject.asObservable();


  private modalNotificationSubject = new Subject<INotification>();
  modalNotification$ = this.modalNotificationSubject.asObservable();

  constructor() {
    this.loadNotificationsFromFirestore();
  }

  /**
   * Carrega as notificações do Firestore.
   */
  private loadNotificationsFromFirestore(): void {
    const notificationsRef = collection(this.db, 'notifications');
    getDocs(notificationsRef).then(querySnapshot => {
      const notifications = querySnapshot.docs.map(doc => {
        const data = doc.data();

        // Garantir que os dados do Firestore estejam completos e com as propriedades necessárias
        const notification: INotification = {
          id: doc.id,
          message: data['message'] || '', 
          type: data['type'] || 'info', 
          isRead: data['isRead'] ?? false, 
          timestamp: data['timestamp'] ? new Date(data['timestamp'].seconds * 1000) : new Date(), 
          link: data['link'] || '', 
        };

        return notification;
      });

      this.notificationSubject.next(notifications);
    }).catch(error => console.error("Erro ao carregar notificações do Firestore:", error));
  }

  /**
   * Exibe uma nova notificação e a salva no Firestore.
   * @param message Mensagem da notificação
   * @param type Tipo da notificação (info, warning, error)
   * @param options Opções de configuração como duração, link, e silenciosa
   */
  showNotification(
    message: string,
    type: 'info' | 'warning' | 'error' = 'info',
    options?: { duration?: number; silent?: boolean; link?: string }
  ): void {
    const notification: INotification = {
      id: (Date.now() + Math.random()).toString(),
      message,
      type,
      isRead: false,
      timestamp: new Date(),
      link: options?.link,
    };

    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = [...currentNotifications, notification];
    this.notificationSubject.next(updatedNotifications);

    this.saveToFirestore(updatedNotifications);

    if (!options?.silent) {
      this.modalNotificationSubject.next(notification);
    }
  }

  /**
   * Remove uma notificação específica e atualiza o Firestore.
   * @param notificationToRemove A notificação a ser removida
   */
  clearNotification(notificationToRemove: INotification): void {
    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = currentNotifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    );

    this.notificationSubject.next(updatedNotifications);
    this.saveToFirestore(updatedNotifications);
  }

  /**
   * Remove todas as notificações e atualiza o Firestore.
   */
  clearAll(): void {
    this.notificationSubject.next([]);
    this.saveToFirestore([]);
  }

  /**
   * Marca uma notificação como lida e atualiza o Firestore.
   * @param notificationId O ID da notificação a ser marcada como lida
   */
 markAsRead(notificationId: string): void {  // Alterado para 'string'
  const currentNotifications = this.notificationSubject.value;
  const updatedNotifications = currentNotifications.map((n) => {
    if (n.id === notificationId) {  // Comparando corretamente com uma string
      return { ...n, isRead: true };
    }
    return n;
  });
  this.notificationSubject.next(updatedNotifications);
  this.saveToFirestore(updatedNotifications);
 }

  /**
   * Marca todas as notificações como lidas e atualiza o Firestore.
   */
  markAllAsRead(): void {
    const currentNotifications = this.notificationSubject.value;
    const updatedNotifications = currentNotifications.map((n) => ({
      ...n,
      isRead: true,
    }));
    this.notificationSubject.next(updatedNotifications);
    this.saveToFirestore(updatedNotifications);
  }

  /**
   * Salva as notificações no Firestore.
   * @param notifications Lista de notificações a serem salvas.
   */
  private saveToFirestore(notifications: INotification[]): void {
    const notificationsRef = collection(this.db, 'notifications');
    
    notifications.forEach(notification => {
      const notificationRef = doc(notificationsRef); 
      setDoc(notificationRef, notification).catch(error => {
        console.error("Erro ao salvar notificação no Firestore:", error);
      });
    });
  }
}
