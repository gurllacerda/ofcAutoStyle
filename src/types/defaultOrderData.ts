import { OrderData } from './orderData';

export interface DefaultOrderData extends OrderData { 
    defaultOrderId: string; 
    name: string;
  }