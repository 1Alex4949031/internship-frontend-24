import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import AdvertisementsPage from './pages/AdvertisementsPage/AdvertisementsPage';
import AdvertisementPage from './pages/AdvertisementPage/AdvertisementPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
    return (
        <Router>
            <ScrollToTop/>
            <NavBar/>
            <Routes>
                <Route path="/advertisements" element={<AdvertisementsPage/>}/>
                <Route path="/advertisements/:id" element={<AdvertisementPage/>}/>
                <Route path="/orders" element={<OrdersPage/>}/>
                <Route path="/" element={<Navigate to="/advertisements" replace={false}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
