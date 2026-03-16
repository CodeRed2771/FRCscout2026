import { useState } from 'react'
import MatchScoutingForm from './workflows/MatchScouting/form.jsx'
import { Routes, Route } from 'react-router-dom';
import PitScoutingForm from './workflows/PitScouting/form.jsx';
import HumanPlayerForm from './workflows/HumanPlayerScouting/form.jsx';
import MainMenu from './MainMenu';
import './css/App.css'
import useLocalStorage from './utils/useLocalStorage';

function App() {
  let [matches, setMatches] = useLocalStorage('matches', []);
  let [hpMatches, sethpMatches] = useLocalStorage('hpMatches', []);
  let sending = false;

  const uploadData = async (data, hpdata) => {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyC8aC7vOP1B3e89zjL6TsN4KXmCK77cz5xH_sDpWWb-i3j2Us9PuF_85xrTk72DKun9w/exec";
    const payload = {
      matchData: data,
      hpData: hpdata
    };

    console.log(hpdata)
    
    if(sending != true) {
      sending = true;
      if((data != [] && data != "") || (hpdata != [] && hpdata != "")) {
        try {
          const response = await fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors", // Required for Google Apps Script redirects
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          
          setMatches([]);
          sethpMatches([]);

          alert("Data successfully sent!");

          sending = false;
        } catch (error) {
          alert("Upload failed:", error);
          sending = false;
        }
      } else {
        alert("Fine twin, thou hast no data to send!")
        sending = false;
      }
    } else {
      alert("chillax brochacho you only need to submit once")
    }
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainMenu uploadData={uploadData} hpMatches={hpMatches} matches={matches}/>} />
        <Route path="/pit" element={<PitScoutingForm />} />
        <Route path="/match" element={<MatchScoutingForm matches={matches} setMatches={setMatches}/>} />
        <Route path="/humanplayer" element={<HumanPlayerForm sethpMatches={sethpMatches}/>} />
      </Routes>
    </div>
  )
}

export default App
