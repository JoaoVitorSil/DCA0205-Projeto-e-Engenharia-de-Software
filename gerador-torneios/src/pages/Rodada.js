import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
export default function Rodada() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rodadas, setRodadas] = useState([{}]);
  const [jogadores, setJogadores] = useState([{}]);

  
  const { id } = useParams();
  async function getRodadas() {
    const torneio = await api.get(`http://localhost:8080/torneios/?name=${id}`);
    setJogadores(torneio.data.players);
    setRodadas(torneio.data.rounds);
    setTotalPages(torneio.data.rounds.length);
  }
  useEffect(() => {
    getRodadas();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, [page]);

  const onLeftClickHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const onRightClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };

  const onChangeHandler = async (e) => {
    const data = JSON.parse(e.target.value)
    const torneio = await api.put(`http://localhost:8080/jogadores/?name=${data.name}&points=${data.points}&game=${data.gameId}&white=${data.white}`);
  }

  const finalizaRodada = () => {
    window.location.href = `/tabela/${id}`
  }


  return (

    <div className="container">
      <Pagination
        page={page + 1}
        totalPages={totalPages}
        onLeftClick={onLeftClickHandler}
        onRightClick={onRightClickHandler}
      />
      <div className="row">
        {rodadas[page].games &&
          rodadas[page].games.map((partida,index) => {
            return (
              <div className="col-3 mt-5">
                <div className="partida-card p-3 ">
                  <div className="result">
                    <h3 className="text-start ms-3">{partida.white.name}</h3>
                    <select className={`partida-${index}-branca`} onChange={onChangeHandler} disabled={partida.whiteResultRegistered}>
                      {partida.whiteResultRegistered ? (<option value={partida.whiteResult}>{partida.whiteResult/2 == 0.5 ? '1/2': partida.whiteResult/2}</option>):
                      ( <>
                        <option>-</option>
                        <option value={JSON.stringify({
                                        'name': partida.white.name,
                                        'gameId': partida.id,
                                        'points': 0,
                                        'white': true, })}>0</option>
                        <option value={JSON.stringify({
                                        'name': partida.white.name, 
                                        'gameId': partida.id,
                                        'points': 2,
                                        'white': true, })}>1</option>
                        <option value={JSON.stringify({
                                        'name': partida.white.name,
                                        'gameId': partida.id,
                                        'points': 1,
                                        'white': true, })}>1/2</option>
                        </>
                      )}
                      
                    </select>
                  </div>
                  <p className="text-start ms-5">x</p>
                  <div className="result">
                    <h3 className="text-start ms-3">{partida.black.name}</h3>
                    <select className={`partida-${index}-preta`} onChange={onChangeHandler} disabled={partida.blackResultRegistered}>
                      {partida.blackResultRegistered  ? 
                      (<option value={partida.blackResult}>{partida.blackResult/2 == 0.5 ? '1/2': partida.blackResult/2}</option>):
                      ( <>
                        <option>-</option>
                        <option value={
                          JSON.stringify(
                            {
                              'name': partida.black.name,
                              'gameId': partida.id,
                              'points': 0,
                              'white': false })}>0</option>
                        <option value={
                          JSON.stringify(
                            { 'name': partida.black.name,
                              'gameId': partida.id,
                              'points': 2,
                              'white': false })}>1</option>
                        <option value={
                          JSON.stringify(
                            {
                              'name': partida.black.name,
                              'gameId': partida.id,
                             'points': 1,
                             'white': false })}>1/2</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className='d-flex justify-content-center my-3'>
        <button className="beje" onClick={finalizaRodada}>Ver Tabela</button>
      </div>
    </div>
  );
}