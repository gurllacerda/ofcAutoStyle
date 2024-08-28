import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Order from '@/models/order';
import { Ingredient } from '@/types';
import { PaymentMethod } from '@/models/paymentMethod';
import { SideDishes } from '@/models/sideDishes';
import { Pizza } from '@/models/pizza';
import { generateTemporaryId } from '@/utils/idUtils';
import { RadioChangeEvent } from 'antd';
import { DefaultOrder } from '@/models/defaultOrder';

export function useOrderForm(initialOrder?: Order | DefaultOrder) {
    // Estado e lógica do hook
    const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Big'>('Small');
    const [selectedPasta, setSelectedPasta] = useState<'Thin' | 'Thick'>('Thin');
    const [isGlutenFree, setIsGlutenFree] = useState<boolean>(true);
    const [selectedPizza, setSelectedPizza] = useState<'Sweet' | 'Savory'>('Sweet');
    const [selectedCheese, setSelectedCheese] = useState<'Mozzarella' | 'Buffalo mozzarella'>('Mozzarella');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [sides, setSides] = useState<SideDishes[]>([]);
    const [payment, setPayment] = useState<'CreditCard' | 'DebitCard' | 'PayPal' | 'Cash'>('Cash');
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [maxSides, setMaxSides] = useState<boolean>(false);
    const [isCard, setIsCard] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [order, setOrder] = useState<Order | DefaultOrder | null>(initialOrder || null);
    const [cardDetails, setCardDetails] = useState<{
        cardNumber?: string;
        cardExpiryDate?: string;
        cardCVV?: string;
    }>({});
    const stepsItens = [
            { title: 'Create Pizza', },
            { title: 'In Progress', },
            { title: 'Review Order', },
            { title: 'Finished' }
        ];
    const router = useRouter();

    // Fetch ingredients
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


        useEffect(() => {
        if(initialOrder !== undefined && initialOrder !== null){
            console.log('não é null ou undefined');
                    setOrder(initialOrder);
                } else {
                    console.log('é null ou undefined');
                }
        }, [initialOrder]);


       
        useEffect(() => {
                if(order){
                    console.log('tem order');
                    const pizza = order.getPizza();
                    setSelectedSize(pizza.size);
                    setSelectedPasta(pizza.pasta);
                    setIsGlutenFree(pizza.isGlutenFree);
                    setSelectedPizza(pizza.type);
                    setSelectedCheese(pizza.cheese);
                    setSelectedIngredients(pizza.ingredients);
        
                    setSides(order.getSideDishes());
                    const paymentMethod = order.getPaymentMethod();
                    setPayment(paymentMethod.type);
                    if (paymentMethod.type !== 'Cash') {
                        setCardDetails(paymentMethod.details || {});
                    } else {
                        setCardDetails({});
                    }
                }
                
        }, [order]);


    
    const handleIngredientChange = (checkedValues: string[]) => {
        setSelectedIngredients(checkedValues);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(initialOrder);
        console.log('Submitting order');
        console.log(order);

        if (order) {
            console.log('entrou para salvar');
            try {
                if (order.getId() && !order.getIsDefaultOrder()) {
                    console.log('entrou update');
                    await order.update();
                    // console.log('Order updated successfully');
                } else {
                    console.log('entrou para o save');
                    await order.save();
                    // console.log('Order saved successfully');
                }
                router.push('/');
            } catch (error) {
                console.error('Failed to save or update order:', error);
            }
        }else {
            console.log('não é order');
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
            setCardDetails({});
        }
        setPayment(pagamento);

        
    };

    
    // console.log(initialOrder);
    // console.log(selectedIngredients);

    return {
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
        stepsItens,
        handleAddSide,
        setCardDetails,
        handleDeleteSide,
        handleIngredientChange,
        handleSave,
        handleSubmit,
        handleEditOrder,
        handlePaymentChange,
        handleGoBack: () => setCurrentStep(currentStep - 1),
    };
}