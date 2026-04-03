import { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from './assets/logo.jpeg'
import './css/App.css'
import useLocalStorage from './utils/useLocalStorage';
import send from './assets/icons/send.svg';
import leaderboard from './assets/icons/leaderboard.svg';

function MainMenu({uploadData, matches, hpMatches, pullTBA}) {

  return (
    <div className="main-menu tuff-load">
        <img className="logo-main" src={logo}></img>

        <nav className="nav-btns tuff-load">
            <Link to="/match" className="nav-btn">Match Scout</Link>
            <Link to="/pit" className="nav-btn">Pit Scout</Link>
            <Link to="/humanplayer" className="nav-btn">Human Player Scout</Link>
            <div className="nav-btn-container">
              <Link to="/leaderboard" className="nav-btn"><img src={leaderboard}></img></Link>
              <button className="nav-btn" id="send" onClick={() => uploadData(matches, hpMatches)}><img src={send}></img></button>
              {
                //<button className="nav-btn" onClick={() => pullTBA("2026miken")}>Pull TBA matches</button>
              }
            </div>
        </nav>
    </div>
  )
}

export default MainMenu;