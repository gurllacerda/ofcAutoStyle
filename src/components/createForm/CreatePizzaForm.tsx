import React from 'react';
import { Radio, Select } from 'antd';
import { Ingredient } from '@/types';
import { Pizza } from '@/models/pizza';
const { Option } = Select;

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
    selectedIngredients,
    handleIngredientChange,
    // currentStep,
    // handleSave
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
                <Select
                    mode="multiple"
                    value={selectedIngredients}
                    onChange={handleIngredientChange}
                    maxCount={4}
                    // disabled={maxReached && selectedIngredients.length >= 4}
                    className="w-full"
                >
                    {ingredients.map((ingredient) => (
                        <Option key={ingredient.name} value={ingredient.name}>
                            {ingredient.name}
                        </Option>
                    ))}
                </Select>
                {selectedIngredients.length >= 4 && <p className="text-red-500 mt-2">You can select up to 4 ingredients.</p>}
            </div>
        </form>
    );
}