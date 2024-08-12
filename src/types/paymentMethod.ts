export interface PaymentMethod {
    type: 'CreditCard' | 'DebitCard' | 'PayPal' | 'Cash';
    details?: {
      cardNumber?: string; // Número do cartão, se aplicável
      cardExpiryDate?: string; // Data de validade do cartão
      cardCVV?: string; // CVV do cartão
    };
  }