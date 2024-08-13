export class Pizza {
    id: string;
    size: 'Small' | 'Medium' | 'Big';
    pasta: 'Thin' | 'Thick';
    isGlutenFree: boolean;
    type: 'Sweet' | 'Savory';
    cheese: 'Mozzarella' | 'Buffalo mozzarella';
    ingredients: string[];

    constructor(
        id: string,
        size: 'Small' | 'Medium' | 'Big',
        pasta: 'Thin' | 'Thick',
        isGlutenFree: boolean,
        type: 'Sweet' | 'Savory',
        cheese: 'Mozzarella' | 'Buffalo mozzarella',
        ingredients: string[]
    ) {
        this.id = id;
        this.size = size;
        this.pasta = pasta;
        this.isGlutenFree = isGlutenFree;
        this.type = type;
        this.cheese = cheese;
        this.ingredients = ingredients;
    }

    // Método para atualizar ingredientes
    updateIngredients(newIngredients: string[]): void {
        this.ingredients = newIngredients;
    }

    // Método para exibir detalhes da pizza
    getDetails(): string {
        return `${this.size} ${this.pasta} pizza with ${this.cheese} cheese and ${this.ingredients.join(', ')}.`;
    }
}