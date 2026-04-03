import { useState, useEffect } from 'react'
import '../../css/App.css'
import useLocalStorage from '../../utils/useLocalStorage';
import Form from './pages/Form';
import PageNav from '../../components/PageNav'
import MatchClock from '../../components/MatchClock'

function HumanPlayerForm({sethpMatches}) {
  const submitMatch = async () => {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbybdaASpBLSDEauSxvRpNhvoIA3iY_Jg7nRxIqp42YfYRjP9LDdZWgIQewSHeJVDvT3Xg/exec";
    const payload = {
      matchData: [],
      hpData: formData
    };
    
    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script redirects
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Data successfully sent!");
    } catch (error) {
      sethpMatches(prevMatches => [...prevMatches, formData]);

      console.log("Upload failed:", error);
    }

    setFormData({
      scouter: formData.scouter,
      matchNum: Number(formData.matchNum) + 1,
      alliance: formData.alliance,
      scores: 0
    });
    setCurrentPage(0);
    setMatchTimer(0);
    setIsActive(false);
    setIsPaused(false);
  }

  const [formData, setFormData] = useLocalStorage('hpformData',
    {
      scouter: "",
      matchNum: 1,
      alliance: "",
      scores: 0
    }
  );

  const togglePause = () => {
    // Only allow pausing if the match has actually started
    if (isActive) {
      setIsPaused(!isPaused);
    }
  };

  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 0);
  const [backText, setBackText] = useLocalStorage('backText',"Back To Main");
  const [matchTimer, setMatchTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state to handle the pause

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setMatchTimer((prev) => {
          // 1. Handle the 20-second pause
          if (prev === 19) { // We check at 19 so the '20' renders and then stays
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              if(disabled.autoCycle === false) {
                setDisabled({...disabled, autoClimb: false, autoFuel: false, autoCycle: true}), setFormData({...formData, autoCycles: {...formData.autoCycles, stops: [...formData.autoCycles.stops, matchTimer]}}) 
              }
            }, 3000);
            return 20;
          }

          // 2. Check if we've reached the final limit
          if (prev >= 160) {
            setIsActive(false);
            return prev;
          }

          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  let pages = [
    <Form submitMatch={submitMatch} formData={formData} setFormData={setFormData}/>,
  ]

  const backToMain = () => {
    window.location = "/"
  }

  const renderPage = () => {
    return pages[currentPage];
  };

  const handleNext = () => {
    if(currentPage != pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setBackText("Back")
    } if(currentPage === pages.length - 2) {
      setDisabled({...disabled, nextBtn: true})
    }
  }

  const handleBack = () => {
    // If we are on the first page, go home
    if (currentPage === 0) {
      backToMain();
    } else {
      // Otherwise, just go to the previous page
      if(currentPage === 1) {
        setBackText("Back To Main")
      }

      setCurrentPage(currentPage - 1);
      setDisabled({...disabled, nextBtn: false})
    }
  };

  const resetMatch = () => {
    if (window.confirm("Are you sure you want to reset the match? All current data will be lost.")) {
      sethpMatches(prevMatches => [...prevMatches, formData]);
      setFormData({
        scouter: formData.scouter,
        matchNum: Number(formData.matchNum),
        alliance: formData.alliance,
        scores: 0
      });
      setCurrentPage(0);
      setMatchTimer(0);
      setIsActive(false);
      setIsPaused(false);
    }
  };

  return (
    <>
      <div className="form tuff-load">
        <MatchClock disabled={(currentPage == 0)} timer={matchTimer} isActive={isActive} setIsActive={setIsActive} togglePause={togglePause} resetMatch={resetMatch} isPaused={isPaused}/>

        {renderPage()}
      </div>

      <PageNav nextButton={true} handleBack={handleBack} backText={backText} handleNext={handleNext}/>
    </>
  )
}

export default HumanPlayerForm;