import { PaymentMethod } from './paymentMethod';
import { Pizza } from './pizza';
import { SideDishes } from './sideDishes';
import axios from 'axios';

export default class Order {
    private pizza: Pizza | null = null;
    private sideDishes: SideDishes[] = [];
    private paymentMethod: PaymentMethod | null = null;

    public constructor ( pizza: Pizza, paymentMethod: PaymentMethod, sideDishes?: SideDishes[]){
        this.pizza = pizza;
        this.paymentMethod = paymentMethod;
        if(sideDishes) {
            this.sideDishes = sideDishes;
        }
    }

    public getPizza(): Pizza | null {
        return this.pizza;
      }
    
      public getSideDishes(): SideDishes[] {
        return this.sideDishes;
      }
    
      public getPaymentMethod(): PaymentMethod | null {
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
        } catch (error){
            console.log('Error saving order!');
        }
    }
}