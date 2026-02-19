import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import PageConnexion from "./components/page/pageConnexion.jsx";
import PageAdmin from "./components/page/pageAdmin.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<PageConnexion/>}/>
                <Route path="/admin/dashboard/*" element={<PageAdmin/>}/>
                <Route path="/" element={<h1>Page temporaire</h1>}/>
                <Route path="*" element={<h1>404 - Page non trouvée</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App