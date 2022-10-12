import React, { useEffect, useState } from "react";

import api, { getJogadores } from "../api";
import { useParams } from "react-router-dom";

export default function Tabela() {
  const [jogadores, setJogadores] = useState([{}]);
  const { id } = useParams();
  async function getJogadores() {
    const torneio = await api.get(`http://localhost:4000/torneios/${id}`);
    setJogadores(torneio.data.jogadores);
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
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>PT</th>
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
