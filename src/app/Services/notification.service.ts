import { Injectable, inject } from '@angular/core';
import { Observable, from, of, switchMap, tap, BehaviorSubject, Subject, map } from 'rxjs';
import { INotification } from '../interfaces/Notification';
import { Auth, user } from '@angular/fire/auth';


import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private user$ = user(this.auth);

  private notificationSubject = new BehaviorSubject<INotification[]>([]);
  notification$ = this.notificationSubject.asObservable();
  private modalNotificationSubject = new Subject<INotification>();
  modalNotification$ = this.modalNotificationSubject.asObservable();

  constructor() {
    this.loadUserNotifications();
  }

 private loadUserNotifications(): void {
  this.user$.pipe(
    switchMap(user => {
      if (!user) {
        this.notificationSubject.next([]);
        return of([]);
      }
      
    
      const notificationsCollection = collection(this.firestore, 'notifications');
      const q = query(
        notificationsCollection,
        where('userId', '==', user.uid)
      );

      
      return (collectionData(q, { idField: 'id' }) as Observable<INotification[]>).pipe(
        map(notifications => {
    
          return notifications.sort((a, b) => (b.timestamp as number) - (a.timestamp as number));
        })
      );
    })
  ).subscribe(notifications => {

    this.notificationSubject.next(notifications);
  });
}


  showNotification(
    message: string,
    type: 'info' | 'warning' | 'error' = 'info',
    options?: { silent?: boolean; link?: string }
  ): void {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return;

    const notificationsCollection = collection(this.firestore, 'notifications');
    const newNotificationData = {
  message,
  type,
  isRead: false,
  timestamp: serverTimestamp(),
  link: options?.link, 
  userId: currentUser.uid
}

    from(addDoc(notificationsCollection, newNotificationData)).subscribe(docRef => {
      if (!options?.silent) {
        const notificationForModal: INotification = {
          id: docRef.id, 
          ...newNotificationData,
          timestamp: Date.now(),
        };
        this.modalNotificationSubject.next(notificationForModal);
      }
    });
  }

  /**
   * Marca uma notificação como lida.
   */
  markAsRead(notificationId: string): Observable<void> {
    const notificationRef = doc(this.firestore, `notifications/${notificationId}`);
    return from(updateDoc(notificationRef, { isRead: true }));
  }

  /**
   * Marca todas as notificações não lidas como lidas usando um Batched Write.
   */
  markAllAsRead(): Observable<void> {
    const unreadNotifications = this.notificationSubject.value.filter(n => !n.isRead);

    if (unreadNotifications.length === 0) {
      return of(undefined);
    }

    // writeBatch permite executar múltiplas operações de escrita como uma única operação atômica
    const batch = writeBatch(this.firestore);

    unreadNotifications.forEach(notification => {
      const notificationRef = doc(this.firestore, `notifications/${notification.id}`);
      batch.update(notificationRef, { isRead: true });
    });

    return from(batch.commit());
  }

  /**
   * Remove uma notificação específica.
   */
  clearNotification(notificationId: string): Observable<void> {
    const notificationRef = doc(this.firestore, `notifications/${notificationId}`);
    return from(deleteDoc(notificationRef));
  }
}