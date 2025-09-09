export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor';
  sector?:  string; 
}