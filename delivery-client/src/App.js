import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <nav>
                    <Link to="/">Создать заказ</Link>
                    <Link to="/orders">Список заказов</Link>
                </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<OrderForm />} />
                        <Route path="/orders" element={<OrderList />} />
                        <Route path="/orders/:id" element={<OrderDetails />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
  );
}

export default App;
