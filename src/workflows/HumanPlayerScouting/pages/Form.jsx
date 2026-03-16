import { useState } from 'react'
import '../../../css/App.css'
import TextInput from '../../../components/inputs/Text.jsx'
import NumberInput from '../../../components/inputs/Num.jsx'
import SelectButtons from '../../../components/inputs/SelectButton.jsx'
import Counter from '../../../components/inputs/Counter.jsx'
import Button from '../../../components/inputs/Button.jsx'
import StartPos from '../../../assets/startpos.jpg'

function Form({formData: formData, setFormData: setFormData, submitMatch}) {
  return (
    <div className="input-page">
        <h1>Pre-Match</h1>
        <TextInput 
            label="Scouter" 
            value={formData.scouter} 
            onChange={(val) => setFormData({...formData, scouter: val})} 
        />
        <NumberInput 
            label="Match Number" 
            value={formData.matchNum} 
            onChange={(val) => setFormData({...formData, matchNum: val})} 
        />
        <Counter
            label="Shots Made"
            count={formData.scores}
            increment={() => setFormData({...formData, scores: formData.scores + 1})}
            decrement={() => setFormData({...formData, scores: formData.scores != 0 ? formData.scores - 1 : 0})}
        />

        <Button
            label="Submit Match"
            onClick={submitMatch}
            type="submit"
        />
    </div>
  )
}

export default Form