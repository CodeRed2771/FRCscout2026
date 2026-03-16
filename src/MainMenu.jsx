import { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from './assets/logo.jpeg'
import './css/App.css'
import useLocalStorage from './utils/useLocalStorage';

function MainMenu({uploadData, matches, hpMatches}) {

  return (
    <div className="main-menu">
        <img className="logo-main" src={logo}></img>

        <nav className="nav-btns">
            <Link to="/pit" className="nav-btn">Pit Scout</Link>
            <Link to="/match" className="nav-btn">Match Scout</Link>
            <Link to="/humanplayer" className="nav-btn">Human Player Scout</Link>
            <button className="nav-btn" id="send" onClick={() => uploadData(matches, hpMatches)}>Send Matches</button>
        </nav>
    </div>
  )
}

export default MainMenu;