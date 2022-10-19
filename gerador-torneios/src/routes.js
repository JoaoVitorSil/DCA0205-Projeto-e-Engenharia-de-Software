import React from 'react'
import Header from './components/Header';
import Jogador from './pages/Jogador';
import Torneio from './pages/Torneio';
import Tabela from './pages/Tabela';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rodada from './pages/Rodada';
export default function RoutesApp() {
  return (
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path="/" element={<Jogador/>} />
      <Route path="/torneio/" element={<Torneio/>} />
      <Route path="/rodadas/:id" element={<Rodada/>} />
      <Route path="/tabela/:id" element={<Tabela/>} />
    </Routes>
</BrowserRouter>
  )
}
