import { useState } from 'react'
import '../../../css/App.css'
import TextInput from '../../../components/inputs/Text.jsx'
import NumberInput from '../../../components/inputs/Num.jsx'
import SelectButtons from '../../../components/inputs/SelectButton.jsx'
import Counter from '../../../components/inputs/Counter.jsx'
import Button from '../../../components/inputs/Button.jsx'

function Auto({disabled, setDisabled, formData, setFormData, isActive, matchTimer}) {
  return (
    <div className="input-page">
        <h1>Auto</h1>

        <Button
          label={"Start Shooting"}
          type="shooting"
          disabled={disabled.autoFuel}
          onClick={() => {setDisabled({...disabled, autoClimb: true, autoFuel: true, autoCycle: false}), setFormData({...formData, autoCycles: {...formData.autoCycles, starts: [...formData.autoCycles.starts, matchTimer]}})}}
        />

        <Button 
          label="Stop Shooting"
          type="shooting"
          onClick={() => {setDisabled({...disabled, autoClimb: false, autoFuel: false, autoCycle: true}), setFormData({...formData, autoCycles: {...formData.autoCycles, stops: [...formData.autoCycles.stops, matchTimer]}}) }}
          disabled={disabled.autoCycle}
        />

        <Button  
          label="Start Climbing"
          type="climbing"
          onClick={() => {setDisabled({...disabled, autoFuel: true, autoCycle: true, autoClimb: true, autoClimbDetails: false}); setFormData({...formData, autoClimb: {...formData.autoClimb, startTime: matchTimer}}) }}
          disabled={disabled.autoClimb}
        />

        <SelectButtons
          label="Attempt Location"
          values={["Center", "Side"]}
          disabled={disabled.autoClimbDetails}
          selected={formData.autoClimb.location}
          onClick={(val) => setFormData({...formData, autoClimb: {...formData.autoClimb, location: val}})}
        />

        <SelectButtons
          label="Success"
          values={["Yes", "No"]}
          disabled={disabled.autoClimbDetails}
          selected={formData.autoClimb.success}
          onClick={(val) => {setFormData({...formData, autoClimb: {...formData.autoClimb, success: val, successTime: val === "Yes" ? matchTimer : ""}})}}
        />

        <SelectButtons
          label="Estimated Fuel Scored"
          values={[0, 5, 10, 20, 30, 40, 50, 70, 100]}
          disabled={!isActive}
          selected={formData.autoFuel}
          onClick={(val) => setFormData({...formData, autoFuel: val})}
        />
    </div>
  )
}

export default Auto