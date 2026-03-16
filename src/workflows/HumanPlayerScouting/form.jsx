import { useState, useEffect } from 'react'
import '../../css/App.css'
import useLocalStorage from '../../utils/useLocalStorage';
import Form from './pages/Form';
import PageNav from '../../components/PageNav'

function HumanPlayerForm({sethpMatches}) {
  const submitMatch = () => {
    sethpMatches(prevMatches => [...prevMatches, formData]);
    setFormData({
      scouter: formData.scouter,
      matchNum: Number(formData.matchNum) + 1,
      scores: 0
    });
  }

  const [formData, setFormData] = useLocalStorage('formData',
    {
        scouter: "",
        matchNum: 1,
        scores: 0
    }
  );

  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 0);
  const [backText, setBackText] = useLocalStorage('backText',"Back To Main");

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

  return (
    <>
      <div className="form">
        {renderPage()}
      </div>

      <PageNav nextButton={true} handleBack={handleBack} backText={backText} handleNext={handleNext}/>
    </>
  )
}

export default HumanPlayerForm;