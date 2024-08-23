'use client';

import Navbar from '@/components/navbar/Navbar';
import Order from '@/models/order';
import { PaymentMethod } from '@/models/paymentMethod';
import { Pizza } from '@/models/pizza';
// import { Ingredient } from '@/types';
import { OrderData } from '@/types/orderData';
import { FormOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
// import Slider from '@/components/slider/Slider';

export default function MenuPage() {
  const [defaultOrders, setDefaultOrders] = React.useState<Order[]>([]);
  // const [ingredients, setIngredients] = useState<Ingredient[]>([]);


  useEffect(() => {
    const getDefaultOrders = async () => {
      try {
        const response = await axios.get<OrderData[]>('http://localhost:3333/defaultOrders');
        const data: OrderData[] = response.data;

        const orders = data.map(orderData => {
          const selectedIngredients = orderData.pizza.ingredients;
          console.log(selectedIngredients);
          const pizza = new Pizza(
            orderData.pizza.id,
            orderData.pizza.size,
            orderData.pizza.pasta,
            orderData.pizza.isGlutenFree,
            orderData.pizza.type,
            orderData.pizza.cheese,
            orderData.pizza.ingredients
          );

          const paymentMethod = new PaymentMethod(
            orderData.paymentMethod.type,
            orderData.paymentMethod.details
          );

          const sideDishes = orderData.sideDishes.map(dish => ({
            id: dish.id,
            name: dish.name
          }));

          return new Order(pizza, paymentMethod, sideDishes, orderData.id, orderData.name);
        });

        setDefaultOrders(orders);
      } catch (error) {
        console.log('Error trying to get default orders', error);
      }
    };

    // setIngredients(def)

    console.log(defaultOrders);
    getDefaultOrders();
  }, []);



  return (
    <>
      <Navbar />
      <h1 className="text-center text-3xl font-bold my-6 text-orange-600">Nossos combos mais pedidos</h1>
      <Row gutter={16} className="p-4">
        {defaultOrders.map((order) => (
          <Col span={8} key={order.getId()} className="mb-4">
            <Card
              title={`${order.getName()} - #${order.getId()}`}
              bordered={false}
              className="bg-orange-100 shadow-lg border border-orange-200"
              actions={[
                <Button
                  type="link"
                  className="flex items-center justify-center text-white bg-orange-500 hover:bg-white hover:text-orange-500 border-none rounded-lg px-4 py-2 transition-transform duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  href={`/order/${order.getId()}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <FormOutlined className="mr-2" />
                  <span>Editar</span>
                </Button>,
              ]}
            >
              <p><strong className="text-orange-700">Pizza:</strong> {order.getPizza() ? order.getPizza().type : 'None'}</p>
              <p><strong className="text-orange-700">Ingredientes:</strong> {order.getPizza().ingredients.join(', ') || 'None'}</p>
              <p><strong className="text-orange-700">Acompanhamentos:</strong> {order.getSideDishes().map(dish => dish.name).join(', ') || 'None'}</p>
              <p><strong className="text-orange-700">Método de Pagamento:</strong> {order.getPaymentMethod() ? order.getPaymentMethod().type : 'Not Selected'}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}