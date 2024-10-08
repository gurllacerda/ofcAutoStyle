import React from 'react';
import { Card } from 'antd';
// import { Pizza } from '@/models/pizza';
// import { SideDishes } from '@/models/sideDishes';
// import { PaymentMethod } from '@/models/paymentMethod';
import Order from '@/models/order';
import { FormOutlined } from '@ant-design/icons';

interface OrderSummaryProps {
    order: Order;
    onEdit: (section: string) => void;
}

export default function OrderSummary({ order, onEdit }: OrderSummaryProps) {
    const pizza = order.getPizza();
    const sideDishes = order.getSideDishes();
    const paymentMethod = order.getPaymentMethod(); 
    const cardDetails = paymentMethod?.details;
   

    if (!pizza) {
        return <p>No pizza selected.</p>;
    }
    

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            {/* <!-- Order Summary Card --> */}
            <Card title="Order Summary" className="w-full bg-orange-100 shadow-sm border border-gray-200 rounded-lg">

                {/* <!-- Pizza Details Section --> */}
                <Card className="mb-3 bg-white shadow-sm border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between p-3 border-b border-gray-200">
                        <h3 className="text-orange-600 font-semibold text-lg">Pizza Details</h3>
                        <button className="text-orange-600 hover:text-orange-700">
                            <FormOutlined onClick={() => onEdit('pizza')} className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-3 space-y-1">
                        <p><strong className="text-orange-600">Size:</strong> {pizza.size}</p>
                        <p><strong className="text-orange-600">Pasta:</strong> {pizza.pasta}</p>
                        <p><strong className="text-orange-600">Type:</strong> {pizza.type}</p>
                        <p><strong className="text-orange-600">Cheese:</strong> {pizza.cheese}</p>
                        <p><strong className="text-orange-600">Gluten Free:</strong> {pizza.isGlutenFree ? 'Yes' : 'No'}</p>
                        <p><strong className="text-orange-600">Ingredients:</strong> {pizza.ingredients.join(', ')}</p>
                    </div>
                </Card>

                {/* <!-- Side Dishes Section --> */}
                <Card className="mb-3 bg-white shadow-sm border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between p-3 border-b border-gray-200">
                        <h3 className="text-orange-600 font-semibold text-lg">Side Dishes</h3>
                        <button className="text-orange-600 hover:text-orange-700">
                            <FormOutlined onClick={() => onEdit('sideDishes')} className="w-4 h-4" />
                        </button>
                    </div>
                    <ul className="p-3 list-disc list-inside space-y-1">
                        {sideDishes.map((sideDish, index) => (
                            <li key={index} className="text-gray-800">{sideDish.name}</li>
                        ))}
                    </ul>
                </Card>

                {/* <!-- Payment Method Section --> */}
                <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between p-3 border-b border-gray-200">
                        <h3 className="text-orange-600 font-semibold text-lg">Payment Method</h3>
                        <button className="text-orange-600 hover:text-orange-700">
                            <FormOutlined onClick={() => onEdit('paymentMethod')} className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-3">
                        <p className="text-gray-800">{paymentMethod !== null ? paymentMethod.type : 'Not selected'}</p>
                    </div>

                    {/* Card Details Section (only if CreditCard or DebitCard is selected) */}
                    {(paymentMethod?.type === 'CreditCard' || paymentMethod?.type === 'DebitCard') && cardDetails && (
                        <div className="p-3 border-t border-gray-200">
                            <p className="text-gray-800">
                                <span className="font-semibold text-orange-600">Card Number:</span> {cardDetails.cardNumber}
                            </p>
                            <p className="text-gray-800">
                                <span className="font-semibold text-orange-600">Expiry Date:</span> {cardDetails.cardExpiryDate}
                            </p>
                            <p className="text-gray-800">
                                <span className="font-semibold text-orange-600">CVV:</span> {cardDetails.cardCVV}
                            </p>
                        </div>
                    )}
                </Card>
            </Card>
        </div>
    );
}