const NumberInput = ({ label, value, onChange, placeholder, disabled, setDisabled, type = "number" }) => {
  return (
    <div className="input-group">
      <label>{label}:</label>
      <input 
        type={type} 
        value={value} 
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
};

export default NumberInput;