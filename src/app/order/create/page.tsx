'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import { useState, useEffect } from 'react';
import { Button, RadioChangeEvent, Steps } from 'antd';
import axios from 'axios';
import CreatePizzaForm from '@/components/createForm/CreatePizzaForm';
import { Ingredient } from '@/types';
import Order from '@/models/order';
import { Pizza } from '@/models/pizza';
import { generateTemporaryId } from '@/utils/idUtils';
import SideDishesForm from '@/components/sideDishesForm/SideDishesForm';
import { SideDishes } from '@/models/sideDishes';
import { PaymentMethod } from '@/models/paymentMethod';
import OrderSummary from '@/components/orderSummary/OrderSummary';
import PaymentForm from '@/components/paymentForm/paymentForm';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';



export default function CreatePage() {
    const [selectedSize, setSelectedSize] = React.useState<'Small' | 'Medium' | 'Big'>('Small');
    const [selectedPasta, setSelectedPasta] = React.useState<'Thin' | 'Thick'>('Thin');
    const [isGlutenFree, setIsGlutenFree] = useState<boolean>(true);
    const [selectedPizza, setSelectedPizza] = React.useState<'Sweet' | 'Savory'>('Sweet');
    const [selectedCheese, setSelectedCheese] = React.useState<'Mozzarella' | 'Buffalo mozzarella'>('Mozzarella');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [sides, setSides] = useState<SideDishes[]>([]);
    const [payment, setPayment] = React.useState<'CreditCard' | 'DebitCard' | 'PayPal' | 'Cash'>('Cash');
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [maxSides, setMaxSides] = useState<boolean>(false);
    const [isCard, setIsCard] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const stepsItens = [
        { title: 'Create Pizza', },
        { title: 'In Progress', },
        { title: 'Review Order', },
        { title: 'Finished' }
    ];
    const [order, setOrder] = useState<Order | null>(null);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardExpiryDate: '',
        cardCVV: ''
    });
    const router = useRouter();

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await axios.get('http://localhost:3333/ingredients');
                const data: Ingredient[] = response.data;
                setIngredients(data);
            } catch (error) {
                console.log('Erro ao pegar ingredientes:', error);
            }
        };

        getIngredients();
    }, []);

    const handleIngredientChange = (checkedValues: string[]) => {
        setSelectedIngredients(checkedValues);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submitting order');

        if (order) {
            try {
                await order.save();
                console.log('Order saved successfully');
                router.push('/');
            } catch (error) {
                console.error('Failed to save order:', error);
            }
        }

    };

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('entrou save');
        if (currentStep === 0) {
            if (!order) {
                const pizza = new Pizza(
                    generateTemporaryId(),
                    selectedSize,
                    selectedPasta,
                    isGlutenFree,
                    selectedPizza,
                    selectedCheese,
                    selectedIngredients
                );

                //passando um paymentMethod fictíco para que a pizza seja adicionada, porém ao adicionar o payment muda
                const paymentMethod: PaymentMethod = { type: 'CreditCard' };
                setOrder(new Order(pizza, paymentMethod));
            } else {
                // Atualiza a pizza existente
                const updatedPizza = new Pizza(
                    generateTemporaryId(),
                    selectedSize,
                    selectedPasta,
                    isGlutenFree,
                    selectedPizza,
                    selectedCheese,
                    selectedIngredients
                );
                order.addPizza(updatedPizza);
            }
        }
        else if (currentStep === 1) {
            if (order) {
                order?.addSideDishes(sides);
            }
        } else if (currentStep === 2) {
            if (order) {
                const paymentMethod: PaymentMethod = { type: payment, details: cardDetails };
                order?.addPaymentMethod(paymentMethod);
            }
        }

        console.log(order);
        setCurrentStep(currentStep + 1);
    };

    const handleAddSide = (newSideDish: SideDishes) => {
        if (!maxSides) {
            setSides([...sides, newSideDish]);
            if (sides.length >= 1) {
                setMaxSides(true);
            }
        }
    };

    const handleDeleteSide = (id: string) => {
        const newSides = sides.filter((side) => side.id !== id);
        setSides(newSides);
        setMaxSides(newSides.length >= 2);
    };

    const handleEditOrder = (section: string) => {
        switch(section){
            case 'pizza':
                setCurrentStep(0);
                break;
            case 'sideDishes':
                setCurrentStep(1);
                break;
            case 'paymentMethod':
                setCurrentStep(2);
                break;
        }
        
    };

    const handlePaymentChange = (e: RadioChangeEvent) => {
        const pagamento = e.target.value;
        if ((pagamento !== 'PayPal') && (pagamento !== 'Cash')) {
            setIsCard(true);
        } else {
            setIsCard(false);
        }
        setPayment(pagamento);
    };

    const handleGoBack = () => {
        setCurrentStep(currentStep - 1);
    };
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
