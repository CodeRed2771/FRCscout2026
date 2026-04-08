import { useState } from 'react'
import '../../../css/App.css'
import TextInput from '../../../components/inputs/Text.jsx'
import NumberInput from '../../../components/inputs/Num.jsx'
import SelectButtons from '../../../components/inputs/SelectButton.jsx'
import Counter from '../../../components/inputs/Counter.jsx'
import Button from '../../../components/inputs/Button.jsx'
import StartPos from '../../../assets/startpos.jpg'

function Form({formData: formData, setFormData: setFormData, submitMatch, disabled, matchTimer}) {
  return (
    <div className="input-page">
        <h1>Pit Scouting</h1>
        <TextInput 
            label="Scouter" 
            value={formData.scouter} 
            onChange={(val) => setFormData({...formData, scouter: val})} 
        />
        <NumberInput 
            label="Team Number" 
            value={formData.teamNum} 
            onChange={(val) => setFormData({...formData, teamNum: val})} 
        />
        <SelectButtons
          label="Drive Train"
          values={["Swerve", "Mecanum", "Tank", "Other"]}
          selected={formData.driveTrain}
          onClick={(val) => {setFormData({...formData, driveTrain: val})}}
        />
        <SelectButtons
          label="Do they have a turret"
          values={["No", "Yes"]}
          selected={formData.turret}
          onClick={(val) => {setFormData({...formData, turret: val})}}
        />
        <NumberInput 
            label="Max Fuel Capacity" 
            value={formData.capacity} 
            onChange={(val) => setFormData({...formData, capacity: val})} 
        />

        <NumberInput 
            label="Auto Fuel" 
            value={formData.autoFuel} 
            onChange={(val) => setFormData({...formData, autoFuel: val})} 
        />

        <SelectButtons
          label="Climb"
          values={["None", "L1", "L2", "L3"]}
          selected={formData.climb}
          onClick={(val) => {setFormData({...formData, climb: val})}}
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