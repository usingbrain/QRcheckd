import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactComponent as QRLogo } from '../Assets/PerfectLogo.svg';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import React from 'react';

const Startpage: React.FC = () => {
    return (
        <div className="h-full">
            <div className="h-20 w-32 m-2 md:h-24 md:w-36 lg:h-28 lg:w-40 xl:h-32 xl:w-44"><QRLogo /></div>
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