import React, { useEffect, useState } from "react";

import api from "../api";
import { useParams } from "react-router-dom";

export default function Tabela() {
  const [jogadores, setJogadores] = useState([{}]);
  const { id } = useParams();
  async function getJogadores() {
    const pla = [{}];
    const torneio = await api.get(`http://localhost:8080/torneios/?name=${id}`);
    torneio.data.players.map((pl,index) =>{
      const performance = pl.performances.find(tName => tName.tournamentName === id)
      const jogador = {'name': pl.name, ...performance}
      pla.push(jogador)
      
      console.log(performance)
    })
    pla.shift()
    const jogadoresSorted =  pla.sort(({points:a},{points: b})=> b-a)
    setJogadores(jogadoresSorted);
 
  }
  useEffect(() => {
    getJogadores();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  const verRodadas = () =>{
    window.location.href = `/rodadas/${id}`
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
            <h1 className="mb-4">Tabela de Resultados</h1>
          <table className="w-100 m-3">
            <tr>
              <th>Jogador</th>
              <th>Vitórias</th>
              <th>Empates</th>
              <th>Derrotas</th>
              <th>Pontuação</th>
            </tr>

            {jogadores.map((jogador, index) => {
              console.log(jogador)
              return (
                <tr key={index}>
                  <td>{jogador.name}</td>
                  <td>{jogador.numWins}</td>
                  <td>{jogador.numDraws}</td>
                  <td>{jogador.numLosses}</td>
                  <td>{jogador.points/2}</td>
                </tr>
              );
            })}
          </table>
          <div className='d-flex justify-content-center my-3'>
        <button className="beje" onClick={verRodadas}>Ver Rodadas</button>
        </div>
        </div>
      </div>
    </div>
  );
}
