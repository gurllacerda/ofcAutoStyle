export interface OrderData {
  id: string;
  name?: string;
  pizza: {
      id: string;
      size: 'Small' | 'Medium' | 'Big';
      pasta: 'Thin' | 'Thick';
      isGlutenFree: boolean;
      type: 'Sweet' | 'Savory';
      cheese: 'Mozzarella' | 'Buffalo mozzarella';
      ingredients: string[];
  };
  sideDishes: {
      id: string;
      name: string;
  }[];
  paymentMethod: {
      type: 'CreditCard' | 'DebitCard' | 'PayPal' | 'Cash';
      details: {
          cardNumber?: string;
          cardExpiryDate?: string;
          cardCVV?: string;
      };
  };
}