export class PaymentMethod {
    type: 'CreditCard' | 'DebitCard' | 'PayPal' | 'Cash';
    details?: {
        cardNumber?: string;
        cardExpiryDate?: string;
        cardCVV?: string;
    };

    constructor(
        type: 'CreditCard' | 'DebitCard' | 'PayPal' | 'Cash',
        details?: {
            cardNumber?: string;
            cardExpiryDate?: string;
            cardCVV?: string;
        }
    ) {
        this.type = type;
        if (details) {
            this.details = {
                cardNumber: details.cardNumber,
                cardExpiryDate: details.cardExpiryDate,
                cardCVV: details.cardCVV,
            };
        }
    }
}