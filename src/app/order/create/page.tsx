'use client';

import React from 'react';
import { Steps, Button } from 'antd';
import CreatePizzaForm from '@/components/createForm/CreatePizzaForm';
import SideDishesForm from '@/components/sideDishesForm/SideDishesForm';
import PaymentForm from '@/components/paymentForm/paymentForm';
import OrderSummary from '@/components/orderSummary/OrderSummary';
import { useOrderForm } from '@/utils/useOrderForm';



export default function CreatePage() {   
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
    } = useOrderForm();
    
    return (
        <>

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
