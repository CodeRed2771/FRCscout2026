import { useState } from 'react'
import '../css/App.css'

function MatchClock ({ timer, disabled, isActive, setIsActive }) {
    let minutes;
    let seconds;
    
    if(timer < 20) {
        minutes = 0;
        seconds = 20 - timer;
    } else {
        const cdtime = 160 - timer;
        seconds = cdtime % 60;
        minutes = (cdtime - seconds) / 60;
    }

    const giveZeroes = (num) => {
        if(String(num).length === 1) {
            return "0" + num;
        } else {
            return num;
        }
    }

    return (
        <div className={"clockContainer"} style={{display: disabled ? "none" : "flex"}}>
            <div className={"clock" + " clock-"+ isActive}>{minutes}:{giveZeroes(seconds)}</div>
            <button style={{display: isActive ? "none" : "flex"}} onClick={() => {setIsActive(true)}}>Start Match</button>
        </div>
    )
}

export default MatchClock;