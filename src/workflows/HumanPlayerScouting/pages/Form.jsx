import { useState } from 'react'
import '../../../css/App.css'
import TextInput from '../../../components/inputs/Text.jsx'
import NumberInput from '../../../components/inputs/Num.jsx'
import SelectButtons from '../../../components/inputs/SelectButton.jsx'
import Counter from '../../../components/inputs/Counter.jsx'
import Button from '../../../components/inputs/Button.jsx'
import StartPos from '../../../assets/startpos.jpg'

function Form({formData: formData, setFormData: setFormData, isActive, submitMatch, disabled, matchTimer}) {
  return (
    <div className="input-page">
        <h1>Human Player Scouting</h1>
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
        <SelectButtons
          label="Alliance"
          values={["Red", "Blue"]}
          selected={formData.alliance}
          onClick={(val) => {setFormData({...formData, alliance: val})}}
        />
        <Counter
            label="Shots Made"
            count={formData.autoScores + formData.teleScores}
            disabled={disabled.shots}
            increment={() => {
                setFormData(prev => ({
                    ...prev,
                    autoScores: matchTimer <= 20 ? prev.autoScores + 1 : prev.autoScores,
                    teleScores: matchTimer > 20 ? prev.teleScores + 1 : prev.teleScores
                }));
            }}

                // Decrement Function
            decrement={() => {
                setFormData(prev => ({
                    ...prev,
                    autoScores: matchTimer <= 20 ? Math.max(0, prev.autoScores - 1) : prev.autoScores,
                    teleScores: matchTimer > 20 ? Math.max(0, prev.teleScores - 1) : prev.teleScores
                }));
            }}
        />

        <Button
            label="Submit Match"
            onClick={submitMatch}
            disabled={isActive}
            type="submit"
        />
    </div>
  )
}

export default Form