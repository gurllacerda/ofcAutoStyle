'use client';

import { DefaultOrder } from '@/models/defaultOrder';
import { PaymentMethod } from '@/models/paymentMethod';
import { Pizza } from '@/models/pizza';
import { DefaultOrderData } from '@/types/defaultOrderData';
import { generateTemporaryId } from '@/utils/idUtils';
import { useOrderForm } from '@/utils/useOrderForm';
import { CheckOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function MenuPage() {
  const [defaultOrders, setDefaultOrders] = React.useState<DefaultOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<DefaultOrder | null>(null);

  const { handleSubmit } = useOrderForm(selectedOrder ?? undefined);

  useEffect(() => {
    const getDefaultOrders = async () => {
      try {
        const response = await axios.get<DefaultOrderData[]>('http://localhost:3333/defaultOrders');
        const data: DefaultOrderData[] = response.data;

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

          return new DefaultOrder(pizza, paymentMethod, orderData.defaultOrderId, sideDishes, orderData.name, generateTemporaryId());
        });

        setDefaultOrders(orders);
      } catch (error) {
        console.log('Error trying to get default orders', error);
      }
    };

    getDefaultOrders();
  }, []);

  const handleOrderSelect = (order: DefaultOrder) => {
    setSelectedOrder(order);
  };



  return (
    <>
      <h1 className="text-center text-4xl font-extrabold my-8 text-orange-600">Nossos Combos Mais Pedidos</h1>
      <Row gutter={24} className="p-4">
        {defaultOrders.map((order) => (
          <Col span={8} key={order.getId()} className="mb-6">
            <Card
              title={<span className="text-orange-700 text-lg font-bold">{`${order.getName() ?? 'Combo'} - ${order.getDefaultOrderId()}`}</span>}
              bordered={false}
              className={`bg-white shadow-xl rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${selectedOrder === order ? 'border-2 border-orange-500' : 'border border-gray-300'
                }`}
              actions={[
                !selectedOrder || selectedOrder !== order ? (
                  <Button
                    onClick={() => handleOrderSelect(order)}
                    className="w-full text-white bg-orange-500 hover:bg-orange-600 border-none rounded-lg py-2 text-lg transition duration-300"
                    style={{
                      backgroundColor: '#f97316',
                      borderColor: 'transparent',
                      color: '#fff',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea580c')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
                  >
                    <CheckOutlined className="mr-2" />
                    Selecionar Pedido
                  </Button>
                ) : (
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setSelectedOrder(null)}
                      className="w-1/2 bg-gray-200 text-gray-700 border-none rounded-lg py-1 text-base transition duration-300 custom-button"
                      style={{
                        backgroundColor: '#e5e7eb',
                        color: '#374151',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d1d5db')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                    >
                      <ArrowLeftOutlined className="mr-2" />
                      Voltar
                    </Button>
                    <Button
                      htmlType="submit"
                      onClick={handleSubmit}
                      className="w-1/2 bg-orange-500 text-white border-none rounded-lg py-1 text-base transition duration-300 ml-2 custom-button"
                      style={{
                        backgroundColor: '#f97316',
                        borderColor: 'transparent',
                        color: '#fff',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea580c')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
                    >
                      <CheckOutlined className="mr-2" />
                      Fazer Pedido
                    </Button>
                  </div>
                ),
              ]}
            >
              <p><strong className="text-orange-700">Pizza:</strong> {order.getPizza()?.type || 'Nenhuma'}</p>
              <p><strong className="text-orange-700">Ingredientes:</strong> {order.getPizza().ingredients.join(', ') || 'Nenhum'}</p>
              <p><strong className="text-orange-700">Acompanhamentos:</strong> {order.getSideDishes().map(dish => dish.name).join(', ') || 'Nenhum'}</p>
              <p><strong className="text-orange-700">Método de Pagamento:</strong> {order.getPaymentMethod()?.type || 'Não Selecionado'}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}