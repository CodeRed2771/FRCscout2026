const SelectButtons = ({ label, values, selected, onClick, disabled, setDisabled }) => {
  return (
    <div className="input-group" style={{pointerEvents: disabled ? "none" : "unset", opacity: disabled ? "0.4" : "1"}}>
      <label>{label}:</label>
      <div className="select-buttons">
        {values.map((value) => {
            return (
              <button className={(value === selected ? "buttonSelected" : "")} key={value} onClick={(e) => onClick(value)}>{value}</button>
            )
        })}
      </div>
    </div>
  );
};

export default SelectButtons;