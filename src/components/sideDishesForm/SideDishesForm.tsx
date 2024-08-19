import React from 'react';
import { Button, Card } from 'antd';
import Image from 'next/image';
import { SideDishes } from '@/models/sideDishes';

const { Meta } = Card;

interface SideDishesFormProps {
    handleAddSide: (newSideDish: SideDishes) => void;
    handleDeleteSide: (id: string) => void;
    maxSides: boolean;
    sides: SideDishes[];
}

//função some retorna true se pelo menos um das verificações da lista foi verdadeira
// Dados dinâmicos para os acompanhamentos
const sideDishesData = [
    { id: '1', name: 'Small fries', image: '/IMG/batataPequena.jpg' },
    { id: '2', name: 'Large fries', image: '/IMG/batataGrande.jpg' },
    { id: '3', name: 'Home fries', image: '/IMG/batataCasa.jpg' },
    { id: '4', name: 'Coca Cola', image: '/IMG/cocaCola.jpg' },
    { id: '5', name: 'Orange Juice', image: '/IMG/orangeJuice.jpg' },
    { id: '6', name: 'Water Bottle', image: '/IMG/waterBottle.jpg' },
];

export default function SideDishesForm({ handleAddSide, handleDeleteSide, maxSides, sides }: SideDishesFormProps) {
    


    return (
        <div className="flex flex-wrap gap-4 p-4 bg-white">
            {sideDishesData.map(dish => (
                <Card
                    key={dish.id}
                    hoverable
                    className="w-60 bg-white shadow-lg border border-gray-200 rounded-lg"
                    cover={
                        <div className="relative w-full h-40">
                            <Image
                                alt={dish.name}
                                src={dish.image}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                                className="rounded-t-lg"
                            />
                        </div>
                    }
                >
                    <Meta
                        title={dish.name}
                        className="text-orange-600 font-semibold"
                    />

                    <div className="flex gap-4 mt-4">
                        <Button
                            disabled={maxSides || sides.some(side => side.id === dish.id)}
                            type='primary'
                            className="bg-orange-500 border border-transparent hover:bg-orange-600 text-white"
                            onClick={() => handleAddSide(new SideDishes(dish.id, dish.name))}
                        >
                            Add
                        </Button>
                        <Button
                            disabled={!sides.some(side => side.id === dish.id)}
                            type='primary'
                            className="bg-red-500 border border-transparent hover:bg-red-600 text-white"
                            onClick={() => handleDeleteSide(dish.id)}
                        >
                            Delete
                        </Button>
                    </div>

                </Card>
            ))}
        </div>
    );
}