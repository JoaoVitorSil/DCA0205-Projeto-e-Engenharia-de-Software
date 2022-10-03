import React, { useEffect, useState } from 'react'
import add from "../assets/add.png"
import api from "../api"
import { useParams } from 'react-router-dom'
export default function Jogador(props) {

  const [nome, setNome] = useState()
  const [jogadores, setJogadores] = useState([{}])
  const { id } = useParams()
  async function getJogadores(){
    const torneio = await api.get(`http://localhost:4000/torneios/${id}`)
    setJogadores(torneio.data.jogadores)
  }
  useEffect(() => {
    getJogadores()
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [])
  
  async function handleJogadores(){
    const torneio = await api.get(`http://localhost:4000/torneios/${id}`)
    const response = await api.patch(`http://localhost:4000/torneios/${id}`, 
    { 
      jogadores:[...torneio.data.jogadores,{
        id: torneio.data.jogadores.length + 1,
        nome: nome,
        pontos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0}]});
    console.log(response.data.jogadores)
    setJogadores(response.data.jogadores)
    setNome('')
  }
  console.log(jogadores)
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
    value={nome}
    onChange={(e)=> setNome(e.target.value)} 
    required />
    </div>
    <div className='d-flex justify-content-center'>
    <button className='btn beje' onClick={handleJogadores}>
        <img src={add} alt="add-icon"/>
        Adicionar</button>
    </div>
    
    <div className="d-flex justify-content-center lista-jogadores m-5 p-4">
    {jogadores.map((jogador, index) => {
      return (<div className='m-3 ' key={index}>{jogador.nome}</div>)
    })}
    </div>
    <div class="d-flex justify-content-end align-items-end">
    <button className='btn beje mb-5'>Gerar Torneio !</button>
    </div>
    
    
  </div>
    
  )
}
