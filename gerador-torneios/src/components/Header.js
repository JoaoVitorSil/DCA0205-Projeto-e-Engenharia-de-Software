import React, { useState } from 'react'
import logo from "../assets/icons8-chess-96.png"
import api from "../api";
export default  function Header() {
  const [torneioNome, setTorneioNome] = useState('')
  async function getTorneioName() {
      const path= window.location.pathname
      const torn = await api.get(`http://localhost:4000/torneios/${path[path.length -1 ]}`)
      console.log(torn.data.nome)
      setTorneioNome(torn.data.nome)
  }
  getTorneioName()
  const novoTorneio = window.location.pathname === "/criar/torneio/:id" ? true:false

  return (
    <nav className="navbar p-2 my-2">
        <div className="header-icon">
            <img src={logo} alt="icon-chess"/>
        </div>
        {novoTorneio ? <button className='beje me-4'>Ver Torneios Anteriores</button> :<h1 className='me-4'>{torneioNome}</h1> }
        
    </nav>
  )
}
