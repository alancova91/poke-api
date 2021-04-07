import "./style.scss";

function Input(props) {
  function handleChange(e) {
    const { value } = e.target;

    props.onChange(value);
  }

  function handleKeyDown(e) {
    const { keyCode } = e;
    props.onKeyDown(keyCode);
  }

  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      onChange={handleChange}
      placeholder="Type Pokemon name or ID..."
      onKeyDown={handleKeyDown}
    />
  );
}

export default Input;
