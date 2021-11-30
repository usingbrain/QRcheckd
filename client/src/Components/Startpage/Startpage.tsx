import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import React from 'react';

const Startpage: React.FC = () => {

    return (
        <div className="h-full">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Startpage;