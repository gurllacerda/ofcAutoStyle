import { PaymentMethod } from '@/types';
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

    
    addPizza (pizza: Pizza): void{
        this.pizza = pizza;
    } 

    addSideDishes (sideDishes: SideDishes[]): void {
        this.sideDishes = sideDishes;
    }


    public async save(): Promise<void>{
        try{
            const orderData = {
                pizza: this.pizza,
                sideDishes: this.sideDishes
            };

            const response = await axios.post('http://localhost:3333/orders', orderData);
            console.log('Order Saved!', response.data);
        } catch (error){
            console.log('Error saving order!');
        }
    }
}