import React from 'react';
import { Button, Card } from 'antd';
// import { Pizza } from '@/models/pizza';
// import { SideDishes } from '@/models/sideDishes';
// import { PaymentMethod } from '@/models/paymentMethod';
import Order from '@/models/order';

interface OrderSummaryProps {
    order: Order;
    onEdit: () => void;
}

export default function OrderSummary({ order, onEdit }: OrderSummaryProps) {
    const pizza = order.getPizza();
    const sideDishes = order.getSideDishes();
    const paymentMethod = order.getPaymentMethod();

    if (!pizza) {
        return <p>No pizza selected.</p>;
    }
    // const { pizza, sideDishes, paymentMethod } = order;

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <Card
                title="Order Summary"
                className="w-full bg-orange-100 shadow-lg border border-gray-200 rounded-lg"
            >
                <h3 className="text-orange-600 font-semibold">Pizza Details</h3>
                <p><strong>Size:</strong> {pizza.size}</p>
                <p><strong>Pasta:</strong> {pizza.pasta}</p>
                <p><strong>Type:</strong> {pizza.type}</p>
                <p><strong>Cheese:</strong> {pizza.cheese}</p>
                <p><strong>Gluten Free:</strong> {pizza.isGlutenFree ? 'Yes' : 'No'}</p>
                <p><strong>Ingredients:</strong> {pizza.ingredients.join(', ')}</p>

                <h3 className="text-orange-600 font-semibold mt-4">Side Dishes</h3>
                <ul className="list-disc list-inside">
                    {sideDishes.map((sideDish, index) => (
                        <li key={index}>{sideDish.name}</li>
                    ))}
                </ul>

                <h3 className="text-orange-600 font-semibold mt-4">Payment Method</h3>
                {paymentMethod !== null &&
                    <p>{paymentMethod.type}</p>
                }


                <div className="text-center mt-6">
                    <Button
                        type="primary"
                        className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onClick={onEdit}
                    >
                        Edit Order
                    </Button>
                </div>
            </Card>
        </div>
    );
}