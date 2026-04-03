import { useState } from 'react'
import '../css/App.css'

function PageNav ({ handleNext, handleBack, backText, disabled, nextButton }) {
    return (
        <>
            <button hidden={nextButton} className={"nav-btn next tuff-load"} onClick={handleNext}>Next</button>
            <button className="nav-btn back tuff-load" onClick={handleBack}>{backText}</button>
        </>
    )
}

export default PageNav;