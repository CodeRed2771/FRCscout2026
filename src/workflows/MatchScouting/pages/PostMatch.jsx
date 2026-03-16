import { useState } from 'react'
import '../../../css/App.css'
import TextInput from '../../../components/inputs/Text.jsx'
import NumberInput from '../../../components/inputs/Num.jsx'
import SelectButtons from '../../../components/inputs/SelectButton.jsx'
import Counter from '../../../components/inputs/Counter.jsx'
import Button from '../../../components/inputs/Button.jsx'
import Textarea from '../../../components/inputs/Textarea.jsx'

function PostMatch({submitMatch, disabled, setDisabled, formData, setFormData, isActive, matchTimer}) {
  return (
    <div className="input-page">
      <h1>Post-Match</h1>

      <SelectButtons
        label="Did they play defense?"
        values={["Yes", "No"]}
        selected={formData.defensePlayed}
        onClick={(val) => {
          setFormData({...formData, defensePlayed: val});
          if(val === "Yes") {
            setDisabled({...disabled, defenseRating: false})
          } else {
            setDisabled({...disabled, defenseRating: true})
          }
        }}
      />

      <SelectButtons
        label="Defense Rating (5 is best)"
        values={["1", "2", "3", "4", "5"]}
        disabled={disabled.defenseRating}
        selected={formData.defenseRating}
        onClick={(val) => setFormData({...formData, defenseRating: val})}
      />

      <Textarea 
        label="Comments"
        value={formData.comments}
        onChange={(val) => setFormData({...formData, comments: val})}
      />

      <Button
        label="Submit Match"
        onClick={submitMatch}
        type="submit"
      />
    </div>
  )
}

export default PostMatch