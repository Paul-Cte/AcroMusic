
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import PageConnexion from "./components/page/pageConnexion.jsx";
import PageAdmin from "./components/page/pageAdmin.jsx";
import PageClient from "./components/page/pageClient.jsx";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTop from "./components/page/scrollToTop.jsx";


function App() {

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <Routes>
                <Route path="/admin" element={<PageConnexion/>}/>
                <Route path="/admin/dashboard/*" element={<PageAdmin/>}/>
                <Route path="/*" element={<PageClient/>}/>
                <Route path="*" element={<h1>404 - Page non trouvée</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App