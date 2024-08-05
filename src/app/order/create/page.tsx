'use client';

import Navbar from '@/components/navbar/Navbar';
import { useState, useEffect } from 'react';


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


    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await fetch('http://localhost:3333/ingredients');
                const data: Ingredient[] = await response.json();
                setIngredients(data);
            } catch (error) {
                console.log('erro ao pegar ingredientes', error);
            }
        };

        getIngredients();
    }, []);

    const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedIngredient = event.target.value;
        let updatedIngredients;

        if (selectedIngredients.includes(selectedIngredient)) {
            updatedIngredients = selectedIngredients.filter(ingredient => ingredient !== selectedIngredient);
        } else {
            updatedIngredients = [...selectedIngredients, selectedIngredient];
        }

        setSelectedIngredients(updatedIngredients);
        setMaxReached(updatedIngredients.length >= 4);
    };



    return (
        <>
            <Navbar />
            <h1 className="text-center text-3xl font-bold text-orange-600 py-6">Create Your Pizza</h1>

            <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-orange-200">
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
                <fieldset className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Pasta Type</legend>
                    <div className="flex items-center mb-4">
                        <input
                            id="pasta-thin"
                            type="radio"
                            name="pasta"
                            value="Thin"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={selectedPasta === 'Thin'}
                            onChange={(e) => setSelectedPasta(e.target.value)}
                        />
                        <label
                            htmlFor="pasta-thin"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Thin
                        </label>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            id="pasta-thick"
                            type="radio"
                            name="pasta"
                            value="Thick"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={selectedPasta === 'Thick'}
                            onChange={(e) => setSelectedPasta(e.target.value)}
                        />
                        <label
                            htmlFor="pasta-thick"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Thick
                        </label>
                    </div>
                </fieldset>

                {/* Gluten Free Selector */}
                <fieldset className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Gluten Free</legend>
                    <div className="flex items-center mb-4">
                        <input
                            id="gluten-free-yes"
                            type="radio"
                            name="gluten-free"
                            value="Yes"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={isGlutenFree}
                            onChange={() => setIsGlutenFree(true)}
                        />
                        <label
                            htmlFor="gluten-free-yes"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Yes
                        </label>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            id="gluten-free-no"
                            type="radio"
                            name="gluten-free"
                            value="No"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={!isGlutenFree}
                            onChange={() => setIsGlutenFree(false)}
                        />
                        <label
                            htmlFor="gluten-free-no"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            No
                        </label>
                    </div>
                </fieldset>

                {/* Pizza Selector */}
                <fieldset className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Pizza Type</legend>
                    <div className="flex items-center mb-4">
                        <input
                            id="pizza-sweet"
                            type="radio"
                            name="pizza"
                            value="Sweet"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={selectedPizza === 'Sweet'}
                            onChange={(e) => setSelectedPizza(e.target.value)}
                        />
                        <label
                            htmlFor="pizza-sweet"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Sweet
                        </label>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            id="pizza-savory"
                            type="radio"
                            name="pizza"
                            value="Savory"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={selectedPizza === 'Savory'}
                            onChange={(e) => setSelectedPizza(e.target.value)}
                        />
                        <label
                            htmlFor="pizza-savory"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Savory
                        </label>
                    </div>
                </fieldset>

                {/* Cheese Selector */}
                <fieldset className="mb-6">
                    <legend className="text-lg font-medium text-orange-600 mb-2">Cheese Type</legend>
                    <div className="flex items-center mb-4">
                        <input
                            id="cheese-mozzarella"
                            type="radio"
                            name="cheese"
                            value="Mozzarella"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={selectedCheese === 'Mozzarella'}
                            onChange={(e) => setSelectedCheese(e.target.value)}
                        />
                        <label
                            htmlFor="cheese-mozzarella"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Mozzarella
                        </label>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            id="cheese-buffalo"
                            type="radio"
                            name="cheese"
                            value="Buffalo mozzarella"
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300"
                            checked={selectedCheese === 'Buffalo mozzarella'}
                            onChange={(e) => setSelectedCheese(e.target.value)}
                        />
                        <label
                            htmlFor="cheese-buffalo"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Buffalo Mozzarella
                        </label>
                    </div>
                </fieldset>

                {/* Additional Ingredients Selector */}
                <div className="mb-6">
                    <label
                        htmlFor="additional-ingredients"
                        className="block mb-2 text-sm font-medium text-orange-600"
                    >
                        Choose Ingredients
                    </label>
                    <fieldset
                        id="additional-ingredients"
                        className="bg-white border border-orange-600 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    >
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={`ingredient-${ingredient.id}`}
                                    value={ingredient.name}
                                    onChange={handleIngredientChange}
                                    checked={selectedIngredients.includes(ingredient.name)}
                                    disabled={maxReached && !selectedIngredients.includes(ingredient.name)}
                                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                                />
                                <label
                                    htmlFor={`ingredient-${ingredient.id}`}
                                    className="ms-2 text-sm font-medium text-gray-900"
                                >
                                    {ingredient.name}
                                </label>
                            </div>
                        ))}
                    </fieldset>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Create Pizza
                    </button>
                </div>
            </form>
        </>
    );
}