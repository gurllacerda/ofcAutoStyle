'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import { useState, useEffect } from 'react';
import { Steps } from 'antd';
import axios from 'axios';
import CreatePizzaForm from '@/components/createForm/CreatePizzaForm';
import { Ingredient } from '@/types';




export default function CreatePage() {
    const [selectedSize, setSelectedSize] = React.useState<'Small' | 'Medium' | 'Big'>('Small');
    const [selectedPasta, setSelectedPasta] = React.useState<'Thin' | 'Thick'>('Thin');
    const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
    const [selectedPizza, setSelectedPizza] = React.useState<'Sweet' | 'Savory'>('Sweet');
    const [selectedCheese, setSelectedCheese] = React.useState<'Mozzarella' | 'Buffalo mozzarella'>('Mozzarella');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [maxReached, setMaxReached] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const stepsItens = [
        {
            title: 'Create Pizza',
        },
        {
            title: 'In Progress',
        },
        {
            title: 'Review Order',
        },
        {
            title: 'Finished'
        }
    ];

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
        console.log(checkedValues);
        setMaxReached(checkedValues.length >= 4);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('entrou submit');

        //  try {
        //     const response = 
        //  }

    };

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('entrou save');
        setCurrentStep(currentStep + 1);
        // const generateTempId = () => Math.random().toString(36).slice(2, 11);

        // const tempPedido = {}


        // const newPizza = {
        //     size: selectedSize,
        //     pasta: selectedPasta,
        //     isGlutenFree: isGlutenFree,
        //     type: selectedPizza,
        //     chesse: selectedCheese,
        //     ingredients: selectedIngredients,
        // };



    };


    return (
        <>
            <Navbar />
            <Steps
                className="custom-steps"
                current={currentStep}
                items={stepsItens}
            />
            <CreatePizzaForm
                handleSave={handleSave}
                handleSubmit={handleSubmit}
                handleIngredientChange={
                handleIngredientChange}
                maxReached={maxReached}
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

        </>
    );
}
