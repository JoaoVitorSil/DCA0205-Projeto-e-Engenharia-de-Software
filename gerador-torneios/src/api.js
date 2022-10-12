import axios from 'axios';

const api = axios.create({
    baseURL:'localhost:4000',})

export default api;

export async function getJogadores(id){
    const torneio = await api.get(`http://localhost:4000/torneios/${id}`)
    return (torneio.data.jogadores)
  }