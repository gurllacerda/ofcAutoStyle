import React from 'react';
import { Button, Checkbox, Radio } from 'antd';
import { Ingredient } from '@/types';
import { Pizza } from '@/models/pizza';


interface CreateFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    selectedSize: Pizza['size'];
    setSelectedSize: (size: Pizza['size']) => void;
    selectedPasta: Pizza['pasta'];
    setSelectedPasta: (pasta: Pizza['pasta']) => void;
    isGlutenFree: Pizza['isGlutenFree'];
    setIsGlutenFree: (isGlutenFree: Pizza['isGlutenFree']) => void;
    selectedPizza: Pizza['type'];
    setSelectedPizza: (type: Pizza['type']) => void;
    selectedCheese: Pizza['cheese'];
    setSelectedCheese: (cheese: Pizza['cheese']) => void;
    ingredients: Ingredient[];
    maxReached: boolean;
    selectedIngredients: string[];
    handleIngredientChange: (checkedValues: string[]) => void;
    currentStep: number;
    handleSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CreatePizzaForm({
    handleSubmit,
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
    maxReached,
    selectedIngredients,
    handleIngredientChange,
    currentStep,
    handleSave,
}: CreateFormProps) {
    return (
        <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-orange-200" onSubmit={handleSubmit}>
            {/* Size Selector */}
            <div className="mb-6">
                <label htmlFor="size" className="block mb-2 text-sm font-medium text-orange-600">
                    Size
                </label>
                <select
                    id="size"
                    className="bg-white border border-orange-600 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value as Pizza['size'])}>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Big">Big</option>
                </select>
            </div>

            {/* Pasta Selector */}
            <div className="mb-6">
                <legend className="text-lg font-medium text-orange-600 mb-2">Pasta Type</legend>
                <Radio.Group onChange={(e) => setSelectedPasta(e.target.value as Pizza['pasta'])} value={selectedPasta}>
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
                <Radio.Group onChange={(e) => setSelectedPizza(e.target.value as Pizza['type'])} value={selectedPizza}>
                    <Radio value="Sweet">Sweet</Radio>
                    <Radio value="Savory">Savory</Radio>
                </Radio.Group>
            </div>

            {/* Cheese Selector */}
            <div className="mb-6">
                <legend className="text-lg font-medium text-orange-600 mb-2">Cheese Type</legend>
                <Radio.Group onChange={(e) => setSelectedCheese(e.target.value as Pizza['cheese'])} value={selectedCheese}>
                    <Radio value="Mozzarella">Mozzarella</Radio>
                    <Radio value="Buffalo mozzarella">Buffalo Mozzarella</Radio>
                </Radio.Group>
            </div>

            {/* Additional Ingredients Selector */}
            <div className="mb-6">
                <label htmlFor="additional-ingredients" className="block mb-2 text-sm font-medium text-orange-600">
                    Select up to 4 ingredients
                </label>
                <div className="w-full">
                    <Checkbox.Group
                        options={ingredients.map((ingredient) => ({
                            label: ingredient.name,
                            value: ingredient.name,
                            disabled: maxReached && !selectedIngredients.includes(ingredient.name),
                        }))}
                        value={selectedIngredients}
                        onChange={handleIngredientChange}
                        className="flex flex-wrap gap-4"
                    />
                </div>
            </div>

            {/* Submit Button */}
            {currentStep === 3 ? (
                <div className="text-center">
                    <Button
                        type="primary"
                        onSubmit={handleSubmit}
                        htmlType="submit"
                        className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Create Pizza
                    </Button>
                </div>
            ) : (
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
            )}
        </form>
    );
}