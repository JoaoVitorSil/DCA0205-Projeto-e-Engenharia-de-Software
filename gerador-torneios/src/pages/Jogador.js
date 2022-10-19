import React, { useEffect, useState } from 'react'
import add from "../assets/add.png"
import del from "../assets/delete.png"
import api from "../api"

export default function Jogador() {

  const [nome, setNome] = useState()
  const [jogadores, setJogadores] = useState([])

  async function getJogadores(){
    const jogadores = await api.get(`http://localhost:8080/jogadores/`)
    console.log('Jogadores aaa',jogadores)
    setJogadores(jogadores.data)
  }
  useEffect(() => {
    getJogadores()
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [jogadores])
  
  async function handleJogadores(){
    let formData = new FormData();
    formData.append('name',nome)
    const response = await api.post(`http://localhost:8080/jogadores/`, formData)
    setNome('');
    
  }
  function criarTorneio(){
      window.location.href = '/torneio'
  }


  return (
  <div className="container">
    
    <div className="d-flex justify-content-center mt-5">
    <h1 className='text-center'>Inserir Jogadores</h1>
    </div>
    <div className='d-flex justify-content-center my-3'>
        <input 
    type="text" 
    id="nome-jogador" 
    placeholder="Nome do jogador"
    name='name'
    value={nome}
    onChange={(e)=> setNome(e.target.value)} 
    autoComplete={false}
    required />
    </div>
    <div className='d-flex justify-content-center buttons'>
    <button className='btn beje' onClick={handleJogadores}>
        <img src={add} alt="add-icon"/>
        Adicionar</button>
    
    </div>
    {jogadores ? (<h2 className='mt-4'>Jogadores Cadastrados :</h2>): (<h2 className='mt-4'>Não há jogadores cadastrados</h2>)}
    
    <div className="d-flex justify-content-center lista-jogadores m-5 p-4">

    {jogadores.map((jogador, index) => {
      return (<div className='m-3 ' key={index}>{jogador.name}</div>)
    })}
    </div>
    <div class="d-flex justify-content-end align-items-end">
    <button className='btn beje mb-5' onClick={criarTorneio}>Criar Torneio ! </button>
    </div>
    
    
  </div>
    
  )
}
