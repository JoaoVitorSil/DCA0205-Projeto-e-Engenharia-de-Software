import React, { useEffect, useState } from "react";

import api from "../api";
import { useParams } from "react-router-dom";

export default function Tabela() {
  const [jogadores, setJogadores] = useState([{}]);
  const { id } = useParams();
  async function getJogadores() {
    const torneio = await api.get(`http://localhost:4000/torneios/${id}`);
    const jogadoresSorted =  torneio.data.jogadores.sort(({pontos:a},{pontos: b})=> b-a)
    setJogadores(jogadoresSorted);
   
  }
  useEffect(() => {
    getJogadores();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);
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
              return (
                <tr key={index}>
                  <td>{jogador.nome}</td>
                  <td>{jogador.vitorias}</td>
                  <td>{jogador.empates}</td>
                  <td>{jogador.derrotas}</td>
                  <td>{jogador.pontos}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
