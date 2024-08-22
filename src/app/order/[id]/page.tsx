'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { Steps, Button } from 'antd';
import CreatePizzaForm from '@/components/createForm/CreatePizzaForm';
import SideDishesForm from '@/components/sideDishesForm/SideDishesForm';
import PaymentForm from '@/components/paymentForm/paymentForm';
import OrderSummary from '@/components/orderSummary/OrderSummary';
import { useOrderForm } from '@/utils/useOrderForm';
import Order from '@/models/order';
import {  useParams } from 'next/navigation';
import axios from 'axios';
import { OrderData } from '@/types/orderData';
import { Pizza } from '@/models/pizza';
import { PaymentMethod } from '@/models/paymentMethod';
import { SideDishes } from '@/models/sideDishes';
// import Link from 'next/link';



export default function EditOrderPage() {
    // const router = useRouter();
    const { id } = useParams();
    const [initialOrder, setInitialOrder] = React.useState<Order>();

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await axios.get<OrderData>(`http://localhost:3333/orders/${id}`);
                const data: OrderData = response.data;

                const pizza = new Pizza(
                    data.pizza.id,
                    data.pizza.size,
                    data.pizza.pasta,
                    data.pizza.isGlutenFree,
                    data.pizza.type,
                    data.pizza.cheese,
                    data.pizza.ingredients
                );

                const paymentMethod = new PaymentMethod(
                    data.paymentMethod.type,
                    data.paymentMethod.details || {} // Handle optional details
                );

                const sideDishes = data.sideDishes.map(dish => new SideDishes(dish.id, dish.name));

                setInitialOrder(new Order(pizza, paymentMethod, sideDishes, data.id));
            } catch (error) {
                console.error('Failed to fetch order:', error);
            }
        };

        if (id) getOrder();
    }, [id]);



    const {
        selectedSize,
        setSelectedSize,
        selectedPasta,
        setSelectedPasta,
        isGlutenFree,
        setIsGlutenFree,
        selectedPizza,
        setSelectedPizza,
        selectedCheese,
        setSelectedCheese,
        ingredients,
        selectedIngredients,
        sides,
        maxSides,
        isCard,
        payment,
        cardDetails,
        currentStep,
        order,
        setCardDetails,
        handleIngredientChange,
        handleAddSide,
        handleDeleteSide,
        handlePaymentChange,
        handleSave,
        handleSubmit,
        handleEditOrder,
        handleGoBack,
        stepsItens
    } = useOrderForm(initialOrder ?? undefined);

    // console.log(selectedSize);

    return (
        <>

            <Navbar />
            <Steps
                className="custom-steps"
                current={currentStep}
                items={stepsItens}
            />

            {currentStep === 0 &&
                <CreatePizzaForm
                    handleSave={handleSave}
                    handleSubmit={handleSubmit}
                    handleIngredientChange={handleIngredientChange}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    selectedPasta={selectedPasta}
                    setSelectedPasta={setSelectedPasta}
                    isGlutenFree={isGlutenFree}
                    setIsGlutenFree={setIsGlutenFree}
                    selectedPizza={selectedPizza}
                    setSelectedPizza={setSelectedPizza}
                    selectedCheese={selectedCheese}
                    setSelectedCheese={setSelectedCheese}
                    ingredients={ingredients}
                    selectedIngredients={selectedIngredients}
                    currentStep={currentStep}
                />
            }

            {currentStep === 1 &&
                <SideDishesForm
                    handleAddSide={handleAddSide}
                    handleDeleteSide={handleDeleteSide}
                    maxSides={maxSides}
                    sides={sides}
                />

            }
            {currentStep === 2 &&
                <PaymentForm
                    setCardDetails={setCardDetails}
                    handlePaymentChange={handlePaymentChange}
                    isCard={isCard}
                    payment={payment}
                    cardDetails={cardDetails}
                />

            }

            {currentStep === 3 && order &&
                <OrderSummary order={order} onEdit={handleEditOrder} />
            }

            <form onSubmit={handleSubmit}>

                {/* Submit Button */}
                {currentStep === 3 ? (
                    <div className="text-center">
                        <Button
                            type="primary"
                            // onSubmit={handleSubmit}
                            htmlType="submit"
                            className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        // href="/"
                        >

                            Create Pizza
                        </Button>
                    </div>
                ) : (
                    <div className="text-center  space-x-2">
                        {currentStep !== 0 &&
                            <Button
                                type="primary"
                                onClick={handleGoBack}
                                htmlType="submit"
                                className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Back
                            </Button>
                        }
                        <Button
                            type="primary"
                            onClick={handleSave}
                            htmlType="submit"
                            className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </form>
        </>
    );
}
