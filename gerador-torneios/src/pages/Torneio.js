import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import api from "../api"
export default function Torneio() {
  const [idTorneio, setIdTorneio] = useState()
  const [nome, setNome] = useState('')
  const [data, setData] = useState('')
  const [cadatrado, setCadastrado] = useState(false)

  async  function handleTorneio(){
    try{
      const torneios = await api.get('http://localhost:4000/torneios/') 
      setIdTorneio(torneios.data.length + 1)
      const response = await api.post('http://localhost:4000/torneios/', {id: idTorneio, nome: nome, data: data, jogadores:[]});
      setCadastrado(true)
    }
    catch{
      setCadastrado(false)
      setNome('')
      setData('')
    }
  }
  return (
   
    <div class="cadastro-torneio">
       {cadatrado && (
      <Navigate to={`/jogadores/${idTorneio}`} replace={true} />
    )}
        <h1>Novo torneio</h1>
        <input type="text" 
        id="nome-torneio" 
        placeholder="Digite o nome do torneio..." 
        value={nome}
        onChange={(e)=> setNome(e.target.value)}
        required />
        <input type="date" 
        id="data-torneio" 
        value={data}
        onChange={(e)=> setData(e.target.value)}
        required/>
        <button onClick={handleTorneio} >Criar Torneio</button>
    </div>
   
  )
}
