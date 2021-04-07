import "./style.scss";

function Button(props) {
  function handleClick() {
    props.onClick();
  }
  return (
    <button className="search-button" onClick={handleClick}>
      Search
    </button>
  );
}

export default Button;
