'use client';

import Order from '@/models/order';
import { FormOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pizza } from '@/models/pizza';
import { PaymentMethod } from '@/models/paymentMethod';
// import { SideDishes } from '@/models/sideDishes';
import { OrderData } from '@/types/orderData';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get<OrderData[]>('http://localhost:3333/orders');
        const data: OrderData[] = response.data;

        // Converter dados da API para instâncias da classe Order
        //return
        const orders = data.map(orderData => {
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

          return new Order(pizza, paymentMethod, false, sideDishes, orderData.id);
        });

        setOrders(orders);
      } catch (error) {
        console.log('Error getting Orders:', error);
      }
    };

    getOrders();
  }, []);


  //LEMBRAR QUE REACT NÃO RENDERIZA OBJEOTS DO TIPO REACT NODE APENAS STRUNG, NUMBERS, ETC

  return (
    <>
      <div className="flex justify-center items-center my-8">
        <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
          My Orders
        </h1>
      </div>
      <Row gutter={16} className="p-4">
        {orders.map((order) => (
          <Col span={8} key={order.getId()} className="mb-4">
            <Card
              title={`Order #${order.getId()}`}
              bordered={false}
              className="bg-white shadow-lg border border-gray-200 transition-transform duration-300 transform hover:scale-105"
              actions={[
                <Button
                  type="link"
                  icon={<FormOutlined />}
                  className="text-orange-600 hover:text-orange-800"
                  href={`/order/${order.getId()}`} 
                >
                  Edit
                </Button>,
              ]}
            >
              <p><strong className="text-orange-600">Pizza:</strong> {order.getPizza() ? order.getPizza().type : 'None'}</p>
              <p><strong className="text-orange-600">Ingredientes:</strong> {order.getPizza().ingredients.join(', ') || 'Nenhum'}</p>
              <p><strong className="text-orange-600">Side Dishes:</strong> {order.getSideDishes().map(dish => dish.name).join(', ') || 'None'}</p>
              <p><strong className="text-orange-600">Payment Method:</strong> {order.getPaymentMethod() ? order.getPaymentMethod().type : 'Not Selected'}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}