'use client';

import Navbar from '@/components/navbar/Navbar';
import { useState, useEffect } from 'react';
import { Radio, Button, Steps, Checkbox } from 'antd'; // Importando Checkbox do Ant Design
import axios from 'axios';

interface Ingredient {
    name: string;
    id: number;
    extraCost?: number;
}

export default function CreatePage() {
    const [selectedSize, setSelectedSize] = useState<string>('Small');
    const [selectedPasta, setSelectedPasta] = useState<string>('Thin');
    const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
    const [selectedPizza, setSelectedPizza] = useState<string>('Sweet');
    const [selectedCheese, setSelectedCheese] = useState<string>('Mozzarella');
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
        // if()

        // const newPizza = {
        //     size: selectedSize,
        //     pastaType: selectedPasta,
        //     isGlutenFree: isGlutenFree,
        //     pizzaType: selectedPizza,
        //     chesseType: selectedCheese,
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

            <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-orange-200" onSubmit={handleSubmit}>

                {/* Size Selector */}
                <div className="mb-6">
                    <label
                        htmlFor="size"
                        className="block mb-2 text-sm font-medium text-orange-600"
                    >
                        Size
                    </label>
                    <select
                        id="size"
                        className="bg-white border border-orange-600 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Big">Big</option>
                    </select>
                </div>

                {/* Pasta Selector */}
                <div className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Pasta Type</legend>
                    <Radio.Group
                        onChange={(e) => setSelectedPasta(e.target.value)}
                        value={selectedPasta}
                    >
                        <Radio value="Thin">Thin</Radio>
                        <Radio value="Thick">Thick</Radio>
                    </Radio.Group>
                </div>

                {/* Gluten Free Selector */}
                <div className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Gluten Free</legend>
                    <Radio.Group
                        onChange={(e) => setIsGlutenFree(e.target.value === 'Yes')}
                        value={isGlutenFree ? 'Yes' : 'No'}
                    >
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </div>

                {/* Pizza Selector */}
                <div className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Pizza Type</legend>
                    <Radio.Group
                        onChange={(e) => setSelectedPizza(e.target.value)}
                        value={selectedPizza}
                    >
                        <Radio value="Sweet">Sweet</Radio>
                        <Radio value="Savory">Savory</Radio>
                    </Radio.Group>
                </div>

                {/* Cheese Selector */}
                <div className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Cheese Type</legend>
                    <Radio.Group
                        onChange={(e) => setSelectedCheese(e.target.value)}
                        value={selectedCheese}
                    >
                        <Radio value="mozzarella">Mozzarella</Radio>
                        <Radio value="buffalo mozzarella">Buffalo Mozzarella</Radio>
                    </Radio.Group>
                </div>

                {/* Additional Ingredients Selector */}
                <div className="mb-6">
                    <label
                        htmlFor="additional-ingredients"
                        className="block mb-2 text-sm font-medium text-orange-600"
                    >
                        Select up to 4 ingredients
                    </label>
                    <div className="w-full">
                        <Checkbox.Group
                            options={ingredients.map(ingredient => ({
                                label: ingredient.name,
                                value: ingredient.name,
                                disabled: maxReached && !selectedIngredients.includes(ingredient.name)
                            }))}
                            value={selectedIngredients}
                            onChange={handleIngredientChange}
                            className="flex flex-wrap gap-4" // Adiciona flexbox para exibir os checkboxes de forma responsiva
                        />
                    </div>
                </div>


                {/* Submit Button */}
                {currentStep === 3
                    ? (
                        <div className="text-center">
                            <Button
                                type="primary"
                                onClick={handleSubmit}
                                htmlType="submit"
                                className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Create Pizza
                            </Button>
                        </div>
                    ) :
                    <div className="text-center">
                        <Button
                            type="primary"
                            onClick={handleSave}
                            htmlType="submit"
                            className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Save
                        </Button>
                    </div>
                }

            </form>
        </>
    );
}
