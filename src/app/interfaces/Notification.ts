
export interface INotification {
 id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  isRead: boolean;     
  timestamp: Date;      
  link?: string;        

}