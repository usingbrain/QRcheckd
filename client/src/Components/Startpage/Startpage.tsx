import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactComponent as QRLogo } from '../Assets/PerfectLogo.svg';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import React from 'react';

const Startpage: React.FC = () => {
    return (
        <div>
            <div className=" h-24 w-40 m-4"><QRLogo /></div>
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