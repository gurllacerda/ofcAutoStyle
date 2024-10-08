import { PaymentMethod } from '@/models/paymentMethod';
import { CardDetails } from '@/types/cardDetails';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';

interface PaymentFormProps {
    isCard: boolean;
    setCardDetails: (details: { cardNumber: string; cardExpiryDate: string; cardCVV: string }) => void;
    cardDetails: PaymentMethod['details'];
    handlePaymentChange: (e: RadioChangeEvent) => void;
    payment: PaymentMethod['type'];
}

export default function PaymentForm({ isCard, setCardDetails, handlePaymentChange, payment, cardDetails }: PaymentFormProps) {
    const [form] = Form.useForm();

    const handleInputChange = (changedValues: Partial<CardDetails>, allValues: CardDetails) => {
        setCardDetails(allValues);
    };

    

    return (
        <div className="text-center p-4">
            {/* Payment Method Section */}
            <div className="max-w-md mx-auto p-6 bg-orange-50 shadow-lg rounded-lg">
                <legend className="text-lg font-semibold text-orange-700 mb-4">Payment Method</legend>
                <Radio.Group
                    onChange={handlePaymentChange}
                    className="flex items-center justify-center space-x-4"
                    value={payment}
                >
                    <Radio
                        value="CreditCard"
                        className="flex items-center text-orange-800 hover:text-orange-600"
                    >
                        <span className="ml-2">Credit Card</span>
                    </Radio>
                    <Radio
                        value="DebitCard"
                        className="flex items-center text-orange-800 hover:text-orange-600"
                    >
                        <span className="ml-2">Debit Card</span>
                    </Radio>
                    <Radio
                        value="PayPal"
                        className="flex items-center text-orange-800 hover:text-orange-600"
                    >
                        <span className="ml-2">PayPal</span>
                    </Radio>
                    <Radio
                        value="Cash"
                        className="flex items-center text-orange-800 hover:text-orange-600"
                    >
                        <span className="ml-2">Cash</span>
                    </Radio>
                </Radio.Group>
            </div>

            {/* Card Details Section */}
            {isCard && (
                <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-orange-600 mb-6">Detalhes do Cartão</h2>
                    <Form
                        form={form}
                        layout="vertical"
                        onValuesChange={handleInputChange}
                        initialValues={cardDetails}
                        className="space-y-4"
                    >
                        <Form.Item
                            name="cardNumber"
                            label={<span className="text-orange-600">Número do Cartão</span>}
                            rules={[{ required: true, message: 'Por favor, insira o número do cartão' }]}
                        >
                            <Input
                                placeholder="0000 0000 0000 0000"
                                className="bg-white border-orange-600 focus:border-orange-600 focus:ring-orange-600"
                            />
                        </Form.Item>

                        <Form.Item
                            name="cardExpiryDate"
                            label={<span className="text-orange-600">Data de Expiração</span>}
                            rules={[{ required: true, message: 'Por favor, insira a data de expiração' }]}
                        >
                            <Input
                                placeholder="MM/AA"
                                className="bg-white border-orange-600 focus:border-orange-600 focus:ring-orange-600"
                            />
                        </Form.Item>

                        <Form.Item
                            name="cardCVV"
                            label={<span className="text-orange-600">CVV</span>}
                            rules={[{ required: true, message: 'Por favor, insira o CVV' }]}
                        >
                            <Input
                                placeholder="123"
                                className="bg-white border-orange-600 focus:border-orange-600 focus:ring-orange-600"
                            />
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
}