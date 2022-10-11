import React, { useEffect, useState } from 'react'
import api from "../api"
import { useParams } from 'react-router-dom'
import Pagination from '../components/Pagination';
export default function Rodada() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rodadas,setRodadas] = useState([{}]);
  const { id } = useParams()
  async function getRodadas(){
    const torneio = await api.get(`http://localhost:4000/torneios/${id}`)
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
    <>
     <Pagination
            page={page+1}
            totalPages={totalPages}
            onLeftClick={onLeftClickHandler}
            onRightClick={onRightClickHandler}
        />
    {rodadas[page].partidas && rodadas[page].partidas.map((partida)=>{
      return(<h1>{partida.jogadorBrancas} x {partida.jogadorPretas}</h1>)
    })}
    
    </>
    
  )
}
