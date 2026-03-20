import { useState, useEffect } from 'react'
import PageNav from '../../components/PageNav'
import MatchClock from '../../components/MatchClock'
import PreMatch from './pages/PreMatch'
import Auto from './pages/Auto'
import Teleop from './pages/Teleop'
import PostMatch from './pages/PostMatch'
import '../../css/App.css'
import useLocalStorage from '../../utils/useLocalStorage';

function MatchScoutingForm({matches, setMatches}) {
  const submitMatch = () => {
    setMatches(prevMatches => [...prevMatches, formData]);
    setFormData({
      scouter: formData.scouter,
      teamNum: 0,
      matchNum: Number(formData.matchNum) + 1,
      startPos: "",
      autoCycles: {
        starts: [],
        stops: []
      },
      autoClimb: {
        startTime: "",
        location: "",
        success: "No",
        successTime: ""
      },
      teleCycles: {
        starts: [],
        stops: []
      },
      teleClimb: {
        startTime: "",
        location: "",
        level: "",
        success: "No",
        successTime: ""
      },
      comments:"",
      defensePlayed:"No",
      defenseRating:""
    });
    setDisabled({
      autoFuel: false,
      autoCycle: true,
      autoClimb: false,
      nextBtn: false,
      autoClimbDetails: true,
      teleFuel: false,
      teleCycle: true,
      teleClimb: false,
      teleClimbDetails: true,
      defenseRating: true
    });
    setCurrentPage(0);
    setMatchTimer(0);
    setIsActive(false);
    setIsPaused(false);
    setBackText("Back To Main")
  }

  const [formData, setFormData] = useLocalStorage('matchformData',
    {
      scouter: "",
      teamNum: 0,
      matchNum: 1,
      startPos: "",
      autoCycles: {
        starts: [],
        stops: []
      },
      autoClimb: {
        startTime: "",
        location: "",
        success: "",
        successTime: ""
      },
      teleCycles: {
        starts: [],
        stops: []
      },
      teleClimb: {
        startTime: "",
        location: "",
        level: "",
        success: "",
        successTime: ""
      },
      comments:"",
      defensePlayed:"No",
      defenseRating:"",
    }
  );

  const [disabled, setDisabled] = useLocalStorage('disabled', {
    autoFuel: false,
    autoCycle: true,
    autoClimb: false,
    nextBtn: false,
    autoClimbDetails: true,
    teleFuel: false,
    teleCycle: true,
    teleClimb: false,
    teleClimbDetails: true,
    defenseRating: true
  });

  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 0);
  const [backText, setBackText] = useLocalStorage('backText',"Back To Main");
  const [matchTimer, setMatchTimer] = useLocalStorage('matchTimer',0);
  const [isActive, setIsActive] = useLocalStorage('isActive', false);
  const [isPaused, setIsPaused] = useLocalStorage('isPaused', false); // New state to handle the pause

  let pages = [
    <PreMatch isActive={isActive} disabled={disabled} setDisabled={setDisabled} formData={formData} setFormData={setFormData}/>,
    <Auto matchTimer={matchTimer} isActive={isActive} disabled={disabled} setDisabled={setDisabled} formData={formData} setFormData={setFormData}/>,
    <Teleop matchTimer={matchTimer} isActive={isActive} disabled={disabled} setDisabled={setDisabled} formData={formData} setFormData={setFormData}/>,
    <PostMatch submitMatch={submitMatch} isActive={isActive} disabled={disabled} setDisabled={setDisabled} formData={formData} setFormData={setFormData}/>
  ]

  const backToMain = () => {
    window.location = "/"
  } // Track if timer is running

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
            setCurrentPage(2);
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

  // Logic to decide which "page" object to render
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

  return (
    <>
      <div className="form">
        <MatchClock disabled={(currentPage == 0)} timer={matchTimer} isActive={isActive} setIsActive={setIsActive}/>
        {renderPage()}
      </div>

      <PageNav disabled={disabled} handleBack={handleBack} backText={backText} handleNext={handleNext}/>
    </>
  )
}

export default MatchScoutingForm