import { useState } from 'react'
import '../../../css/App.css'
import TextInput from '../../../components/inputs/Text.jsx'
import NumberInput from '../../../components/inputs/Num.jsx'
import SelectButtons from '../../../components/inputs/SelectButton.jsx'
import Counter from '../../../components/inputs/Counter.jsx'
import Button from '../../../components/inputs/Button.jsx'

function Teleop({disabled, setDisabled, formData, setFormData, isActive, matchTimer}) {
  return (
    <div style={{pointerEvents: !isActive ? "none" : "unset", opacity: !isActive ? "0.5" : "1"}} className="input-page">
      <h1>Teleop</h1>

      <Button 
        label={"Start Shooting"}
        type="shooting"
        disabled={disabled.teleFuel}
        onClick={() => {setDisabled({...disabled, teleClimb: true, teleFuel: true, teleCycle: false}), setFormData({...formData, teleCycles: {...formData.teleCycles, starts: [...formData.teleCycles.starts, matchTimer]}})}}
      />

      <Button 
        label="Stop Shooting"
        type="shooting"
        onClick={() => {setDisabled({...disabled, teleClimb: false, teleFuel: false, teleCycle: true}), setFormData({...formData, teleCycles: {...formData.teleCycles, stops: [...formData.teleCycles.stops, matchTimer]}}) }}
        disabled={disabled.teleCycle}
      />

      <Button 
        label="Start Climbing"
        type="climbing"
        onClick={() => {setDisabled({...disabled, teleFuel: true, teleCycle: true, teleClimb: true, teleClimbDetails: false}); setFormData({...formData, teleClimb: {...formData.teleClimb, startTime: matchTimer}}) }}
        disabled={disabled.teleClimb}
      />

      <SelectButtons
        label="Attempt Location"
        values={["Center", "Side"]}
        disabled={disabled.teleClimbDetails}
        selected={formData.teleClimb.location}
        onClick={(val) => setFormData({...formData, teleClimb: {...formData.teleClimb, location: val}})}
      />

      <SelectButtons
        label="Attempt Level"
        values={["L1", "L2", "L3"]}
        disabled={disabled.teleClimbDetails}
        selected={formData.teleClimb.level}
        onClick={(val) => setFormData({...formData, teleClimb: {...formData.teleClimb, level: val}})}
      />

      <SelectButtons
        label="Success"
        values={["Yes", "No"]}
        disabled={disabled.teleClimbDetails}
        selected={formData.teleClimb.success}
        onClick={(val) => setFormData({...formData, teleClimb: {...formData.teleClimb, success: val, successTime: val === "Yes" ? matchTimer : ""}})}
      />
    </div>
  )
}

export default Teleop