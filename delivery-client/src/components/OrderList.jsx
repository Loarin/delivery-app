import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        }
        catch (error) {
            console.error("Ошибка загрузки заказов:", error);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="order-list">
            <h2>Список заказов:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Город отправителя</th>
                        <th>Город получателя</th>
                        <th>Вес (кг)</th>
                        <th>Дата получения</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr
                            key={order.id}
                            onClick={() => navigate(`/orders/${order.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{order.orderNumber}</td>
                            <td>{order.senderCity}</td>
                            <td>{order.recipientCity}</td>
                            <td>{order.weight}</td>
                            <td>{new Date(order.pickupDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;