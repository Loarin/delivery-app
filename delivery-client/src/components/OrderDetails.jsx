import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './OrderDetails.css';


const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrder();
    }, [id]);

    const loadOrder = async () => {
        try {
            const response = await api.get(`/orders/${id}`);
            setOrder(response.data);
        }
        catch (error) {
            alert('Заказ не найден');
            navigate('/orders');
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (!order) return <div>Заказ не найден</div>;

    return (
        <div className="order-details">
            <h2>Детали заказа #{order.orderNumber}</h2>
            <div className="details-grid">
                <div>
                    <strong>Город отправителя:</strong>
                    <span>{order.senderCity}</span>
                </div>
                <div>
                    <strong>Адрес отправителя:</strong>
                    <span>{order.senderAddress}</span>
                </div>
                <div>
                    <strong>Город получателя:</strong>
                    <span>{order.recipientCity}</span>
                </div>
                <div>
                    <strong>Адрес получателя:</strong>
                    <span>{order.recipientAddress}</span>
                </div>
                <div>
                    <strong>Вес груза (кг):</strong>
                    <span>{order.weight}</span>
                </div>
                <div>
                    <strong>Дата получения:</strong>
                    <span>{new Date(order.pickupDate).toLocaleDateString()}</span>
                </div>
                <div>
                    <strong>Дата создания:</strong>
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
            </div>
            <button onClick={() => navigate('/orders')}>Назад к списку</button>
        </div>
    );
};

export default OrderDetails;