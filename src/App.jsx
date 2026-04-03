import { useState, useEffect } from 'react'
import MatchScoutingForm from './workflows/MatchScouting/form.jsx'
import Leaderboard from './workflows/Leaderboard/main.jsx'
import { Routes, Route } from 'react-router-dom';
import PitScoutingForm from './workflows/PitScouting/form.jsx';
import HumanPlayerForm from './workflows/HumanPlayerScouting/form.jsx';
import MainMenu from './MainMenu';
import './css/App.css'
import useLocalStorage from './utils/useLocalStorage';

function App() {
  const [matches, setMatches] = useLocalStorage('matches', []);
  const [hpMatches, sethpMatches] = useLocalStorage('hpMatches', []);
  const [TBAdata, setTBAdata] = useLocalStorage([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let sending = false;

  const pullTBA = async (eventKey) => {
    const res = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`, {
      headers: {
        "X-TBA-Auth-Key": "3rTF5gxmIdJSYKqhKohNTzEKl7D9x04ivAFGYzOumRgHdqIA6acFssENXYNkfCK7"
      }
    });

    const data = await res.json();

    console.log(data);
    return data;
  }

  useEffect(() => {
      // 1. Create the async wrapper
      const executeFetch = async () => {
      try {
          setLoading(true);
          setError(null);
          
          // 2. Call the function passed via props
          const result = await pullTBA("2026mimus");
          setTBAdata(result);
      } catch (err) {
          setError(err.message || 'Something went wrong');
      } finally {
          setLoading(false);
      }
      };

      executeFetch();

      // 3. Add fetchRemoteData to the dependency array
  }, []);

  const uploadData = async (data, hpdata) => {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbybdaASpBLSDEauSxvRpNhvoIA3iY_Jg7nRxIqp42YfYRjP9LDdZWgIQewSHeJVDvT3Xg/exec";
    const payload = {
      matchData: data,
      hpData: hpdata
    };

    console.log(data)
    
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

  const fetchData = async () => {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyM8ljOtcp3JjrknMPxd8OnTcHyyeFyLLQQtehJA7h1J24a9bNTKj4HHUMuQ5uVWvX4/exec";

    try {
      const response = await fetch(WEB_APP_URL);
      const data = await response.json();

      // Pulling them into their own arrays
      const allMatches = data.matchData;
      const allHPData = data.hpData;
      const allPitData = data.pitData;

      return {
        match: allMatches,
        hp: allHPData,
        pit: allPitData
      }
    } catch (error) {
      return "Error fetching leaderboard:" + error
    }
  }

  return (
    <div className="app tuff-load">
      <Routes>
        <Route path="/" element={<MainMenu uploadData={uploadData} hpMatches={hpMatches} matches={matches} pullTBA={pullTBA}/>} />
        <Route path="/pit" element={<PitScoutingForm />} />
        <Route path="/match" element={<MatchScoutingForm matches={matches} setMatches={setMatches} TBAdata={TBAdata}/>} />
        <Route path="/leaderboard" element={<Leaderboard fetchData={fetchData}/>} />
        <Route path="/humanplayer" element={<HumanPlayerForm sethpMatches={sethpMatches}/>} />
      </Routes>
    </div>
  )
}

export default App
