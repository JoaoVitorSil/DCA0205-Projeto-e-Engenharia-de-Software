import React from 'react'
import Header from './components/Header';
import Jogador from './pages/Jogador';
import Torneio from './pages/Torneio';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rodada from './pages/Rodada';
export default function RoutesApp() {
  return (
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path="/" element={<Torneio/>} />
      <Route path="/jogadores/:id" element={<Jogador/>} />
      <Route path="/rodadas/:id" element={<Rodada/>} />
    </Routes>
</BrowserRouter>
  )
}
