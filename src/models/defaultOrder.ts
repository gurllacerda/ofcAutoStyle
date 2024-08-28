import { PaymentMethod } from './paymentMethod';
import { Pizza } from './pizza';
import { SideDishes } from './sideDishes';
import Order from './order'; // Certifique-se de que a importação de Order está correta

export class DefaultOrder extends Order {
    private defaultOrderId: string;
    private name?: string;

    public constructor(
        pizza: Pizza,
        paymentMethod: PaymentMethod,
        defaultOrderId: string, // Este ID é obrigatório para DefaultOrder
        sideDishes?: SideDishes[],
        name?: string,
        id?: string
    ) {
        super(pizza, paymentMethod, true, sideDishes, id);
        this.defaultOrderId = defaultOrderId;
        this.name = name;
        
    }

    public getName(): string | undefined {
        return this.name;
    }
    
    public getDefaultOrderId(): string {
        return this.defaultOrderId;
    }
}