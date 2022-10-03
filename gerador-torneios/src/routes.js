import React from 'react'
import Header from './components/Header';
import Jogador from './pages/Jogador';
import Torneio from './pages/Torneio';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
export default function RoutesApp() {
  return (
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path="/" element={<Torneio/>} />
      <Route path="/jogadores/:id" element={<Jogador/>} />
    </Routes>
</BrowserRouter>
  )
}
