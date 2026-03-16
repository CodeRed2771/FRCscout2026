const Textarea = ({ label, value, onChange, placeholder, type = "text", disabled, setDisabled }) => {
  return (
    <div className="input-group comments">
      <label>{label}:</label>
      <textarea 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
};

export default Textarea;