import { PaymentMethod } from './paymentMethod';
import { Pizza } from './pizza';
import { SideDishes } from './sideDishes';
import axios from 'axios';

export default class Order {
    private id?: string;
    private name?: string;
    private pizza: Pizza ;
    private sideDishes: SideDishes[] = [];
    private paymentMethod: PaymentMethod ;

    public constructor ( pizza: Pizza, paymentMethod: PaymentMethod, sideDishes?: SideDishes[], id?: string, name?: string) {
        this.pizza = pizza;
        this.paymentMethod = paymentMethod;
        if(sideDishes) {
            this.sideDishes = sideDishes;
        }
        if(id) {
            this.id = id;
        }
        if(name){
            this.name = name;
        }
    }

    public getId(): string | undefined {
        return this.id;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public getPizza(): Pizza  {
        return this.pizza;
    }

    public getSideDishes(): SideDishes[] {
        return this.sideDishes;
    }

    public getPaymentMethod(): PaymentMethod  {
        return this.paymentMethod;
    }

    addPizza (pizza: Pizza): void{
        this.pizza = pizza;
    } 

    addSideDishes (sideDishes: SideDishes[]): void {
        this.sideDishes = sideDishes;
    }

    addPaymentMethod (paymentMethod: PaymentMethod): void {
        this.paymentMethod = paymentMethod;
    }

    public async save(): Promise<void>{
        try{
            const orderData = {
                pizza: this.pizza,
                sideDishes: this.sideDishes,
                paymentMethod: this.paymentMethod
            };

            const response = await axios.post('http://localhost:3333/orders', orderData);
            console.log('Order Saved!', response.data);

            // Atualiza a instância com o ID retornado
            this.id = response.data.id;
        } catch (error){
            console.log('Error saving order!', error);
        }
    }

    public async update(): Promise<void> {
        if (!this.id) {
            throw new Error('Cannot update an order without an ID.');
        }

        try {
            const orderData = {
                pizza: this.pizza,
                sideDishes: this.sideDishes,
                paymentMethod: this.paymentMethod
            };

            const response = await axios.put(`http://localhost:3333/orders/${this.id}`, orderData);
            console.log('Order Updated!', response.data);
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    }
}