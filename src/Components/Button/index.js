import "./style.scss";

function Button(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick();
  }
  return (
    <button className="search-button" onClick={handleClick}>
      Search
    </button>
  );
}

export default Button;
