export interface Pizza {
    size: 'Small' | 'Medium' | 'Big';
    pasta: 'Thin' | 'Thick';
    isGlutenFree: boolean;
    type: 'Sweet' | 'Savory';
    cheese: 'Mozzarella' | 'Buffalo mozzarella';
    ingredients: string[];
  }