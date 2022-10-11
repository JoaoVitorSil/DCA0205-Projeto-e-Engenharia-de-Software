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
      <div className="container">
      <div className="d-flex justify-content-center mt-5">
      <h1 className='text-center'>Novo torneio</h1>
      </div>
      <div className='d-flex justify-content-center my-3'>
        <input type="text" 
          id="nome-torneio" 
          placeholder="Digite o nome do torneio..." 
          value={nome}
          onChange={(e)=> setNome(e.target.value)}
          required />
      </div>
      
      <div className='d-flex justify-content-center my-3'>
        <input type="date" 
          id="data-torneio" 
          value={data}
          onChange={(e)=> setData(e.target.value)}
          required/>
      </div>
      <div className='d-flex justify-content-center my-3'>
        <button className="beje" onClick={handleTorneio} >Criar Torneio</button>
      </div>
      </div>   
    </div>
   
  )
}
