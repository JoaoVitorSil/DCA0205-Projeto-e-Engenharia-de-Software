import React from 'react'
import logo from "../assets/icons8-chess-96.png"

export default function Header() {
  return (
    <nav className="navbar p-2 my-2">
        <div className="header-icon">
            <img src={logo} alt="icon-chess"/>
        </div>
        <h1>Nome do torneio</h1>
    </nav>
  )
}
