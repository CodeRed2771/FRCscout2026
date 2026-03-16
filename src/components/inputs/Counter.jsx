const Counter = ({ label, count, increment, decrement, disabled, setDisabled }) => {
  return (
    <div className="input-group">
      <label>{label}:</label>
      <div className="counter-buttons">
        <button className="counter-button" onClick={decrement}>-</button>
        <div className="count">{count}</div>
        <button className="counter-button" onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;