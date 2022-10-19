import React, { useState,useEffect} from 'react'
import { Navigate } from "react-router-dom";
import api from "../api"
export default function Torneio() {
  const [nome, setNome] = useState('')
  const [jogadorSelecionado, setJogadorSelecionado] = useState('')
  const [jogadores, setJogadores] = useState([])
  const [jogadoresSelecionados,setJogadoresSelecionados] = useState([])

  async function getJogadores(){
    const jogadores = await api.get(`http://localhost:8080/jogadores/`)
    console.log('Jogadores aaa',jogadoresSelecionados)
    setJogadores(jogadores.data)
  }

  function getJogadoresSelecionados(){
    setJogadoresSelecionados(jogadoresSelecionados)

  }

  useEffect(() => {
    getJogadores()
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [])
  
  useEffect(() => {
    getJogadoresSelecionados()
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [jogadoresSelecionados])


  const onSelectHandler = (e) => {
    setJogadorSelecionado(e.target.value) 
    console.log(e.target.value);

  }

  const confirmSelectHandler = ()=>{
    jogadoresSelecionados.push(jogadorSelecionado)
    console.log(jogadoresSelecionados)
  }
 

  async  function handleTorneio(){
    try{
      let formData = new FormData();
      formData.append('name',nome)
      formData.append('players', jogadoresSelecionados)
      const response = await api.post('http://localhost:8080/torneios/', formData);
      window.location.href = `/rodadas/${nome}`
    }
    catch{
      setNome('')
    }
  }
  return (
   
    <div class="cadastro-torneio">
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
      <select id='player-torneio' onChange={onSelectHandler}>
        <option>-----</option>
        {jogadores && jogadores.map((jogador, index) => {
      return (<option  value={jogador.name}>{jogador.name}</option>)})}
      </select>
      <button onClick={confirmSelectHandler}>Adicionar jogador</button>
      </div>
      <div className='d-flex justify-content-center my-3'>
        <button className="beje" onClick={handleTorneio} >Criar Torneio</button>
        
      </div>
      {jogadoresSelecionados.map((jogador, index) => {
        
        return (<h4 className='d-flex justify-content-space-between m-3 ' key={index}>{jogador}</h4>)
      })}
      </div>   
    </div>
   
  )
}
