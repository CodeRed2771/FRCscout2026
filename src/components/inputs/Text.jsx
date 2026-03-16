const TextInput = ({ label, value, onChange, placeholder, type = "text", disabled, setDisabled }) => {
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

export default TextInput;