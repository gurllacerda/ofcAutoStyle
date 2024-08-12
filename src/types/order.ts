import { Pizza, SideDishes, PaymentMethod } from './index';


export interface Order {
    id?: string; // Opcional se o ID for gerado pelo backend
    pizza: Pizza; // Detalhes da pizza
    sides?: SideDishes[]; // Lista de acompanhamentos (opcional)
    paymentMethod: PaymentMethod; // Método de pagamento
    orderDate?: Date; // Data do pedido (opcional)
  }