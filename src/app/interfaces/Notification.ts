export type NotificationType = 
'success' | 'error' | 'warning' | 'info';

export interface INotification {
  message: string;
  type: NotificationType;
}