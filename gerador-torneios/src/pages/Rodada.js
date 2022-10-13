import React, { useEffect, useState } from 'react'
import api from "../api"
import { useParams } from 'react-router-dom'
import Pagination from '../components/Pagination';
export default function Rodada() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rodadas,setRodadas] = useState([{}]);
  const [jogadores, setJogadores] = useState([{}]);
  
  const { id } = useParams()
  async function getRodadas(){
    const torneio = await api.get(`http://localhost:4000/torneios/${id}`)
    setJogadores(torneio.data.jogadores)
    setRodadas(torneio.data.rodadas)
    setTotalPages(torneio.data.rodadas.length)
    console.log(rodadas)
  }
  useEffect(() => {
    getRodadas()
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [page])

  const onLeftClickHandler = () => {
    if(page > 0) {
        setPage(page-1)
    }
}
const onRightClickHandler = () => {
    if(page+1 !== totalPages){
        setPage(page+1)
    }
}

  return (
    <div className='container'>
     <Pagination
            page={page+1}
            totalPages={totalPages}
            onLeftClick={onLeftClickHandler}
            onRightClick={onRightClickHandler}
        />
    <div className="row">
      
      {rodadas[page].partidas && rodadas[page].partidas.map((partida)=>{
      return(
      <div className="col-3 mt-5">
        <div className='partida-card p-3 '>
          <h3 className='text-start ms-3'>{partida.jogadorBrancas}</h3>
          <p className='text-start ms-5'>x</p>
          <h3 className='text-start ms-3'>{partida.jogadorPretas}</h3>
            
        
        </div>
        </div>)
    })}
      </div>
    
    </div>
    
  )
}
