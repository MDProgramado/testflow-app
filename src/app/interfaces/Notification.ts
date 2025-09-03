
export interface INotification {
 id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  isRead: boolean;     
  timestamp: Date;      
  link?: string;        

}