import React, { useState } from 'react';
import api from '../services/api';
import './OrderForm.css';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        senderCity: '',
        senderAddress: '',
        recipientCity: '',
        recipientAddress: '',
        weight: '',
        pickupDate: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Изменение полей
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Отправка формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/orders', {
                ...formData,
                weight: parseFloat(formData.weight)
            });

            setSuccess(true);
            setFormData({
                senderCity: '',
                senderAddress: '',
                recipientCity: '',
                recipientAddress: '',
                weight: '',
                pickupDate: ''
            });
        }
        catch (error) {
            console.error('При отправке формы произошла ошибка:', error);
            alert('Ошибка при создании заказа');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="order-form">
            <h2>Создание заказа</h2>
            {success && <div className="success">Заказ успешно создан</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Город отправителя</label>
                    <input
                        type="text"
                        name="senderCity"
                        value={formData.senderCity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Адрес отправителя</label>
                    <input
                        type="text"
                        name="senderAddress"
                        value={formData.senderAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Город получателя</label>
                    <input
                        type="text"
                        name="recipientCity"
                        value={formData.recipientCity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Адрес получателя</label>
                    <input
                        type="text"
                        name="recipientAddress"
                        value={formData.recipientAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Вес груза (кг)</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        step="0.1"
                        min="0.1"
                        required
                    />
                </div>
                <div>
                    <label>Дата получения</label>
                    <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Создание...' : 'Создать заказ'}
                </button>
            </form>
        </div>
    );
};

export default OrderForm;