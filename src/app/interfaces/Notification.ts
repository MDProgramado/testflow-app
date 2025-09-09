
export interface INotification {
 id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  isRead: boolean;     
  timestamp: number;      
  link?: string;        

}