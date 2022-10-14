import React, { useEffect, useState } from 'react'
import add from "../assets/add.png"
import del from "../assets/delete.png"
import api from "../api"
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
export default function Jogador() {

  const [nome, setNome] = useState()
  const [jogadores, setJogadores] = useState([{}])
  const [cadatrado, setCadastrado] = useState(false);

  const { id } = useParams()
  async function getJogadores(){
    const jogadores = await api.get(`http://localhost:8080/jogadores/${id}`)
    setJogadores(jogadores.data.jogadores)
  }
  useEffect(() => {
    getJogadores()
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [])
  
  async function handleJogadores(){
    const request = await api.post("http://localhost:4000/jogadores/")
    //setJogadores(response.data.jogadores)
    setNome('');
    setCadastrado(true);
  }
  console.log(jogadores)
  return (
  <div className="container">
    {cadatrado && (
      <Navigate to={`/criar/torneio/${id}`} replace={true} />
    )}
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
    <div className='d-flex justify-content-center buttons'>
    <button className='btn beje' onClick={handleJogadores}>
        <img src={add} alt="add-icon"/>
        Adicionar</button>
    <button className='btn beje' onClick={handleJogadores}>
        <img src={del} alt="del-icon"/>
        Remover</button>
    </div>
    
    <div className="d-flex justify-content-center lista-jogadores m-5 p-4">
    {jogadores.map((jogador, index) => {
      return (<div className='m-3 ' key={index}>{jogador.nome}</div>)
    })}
    </div>
    <div class="d-flex justify-content-end align-items-end">
    <button className='btn beje mb-5'>Criar Torneio !</button>
    </div>
    
    
  </div>
    
  )
}
