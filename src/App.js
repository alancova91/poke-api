import React, { useState } from "react";

import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [pokeData, setPokeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function handleChange(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  async function submitTodoHandler(e) {
    e.preventDefault();

    const getData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputValue}`
    );
    const dataToJson = await getData.json();
    setPokeData(dataToJson);
    setInputValue("");
    console.log(dataToJson);
    setIsLoading(false);
  }

  const dataFetched = (
    <div>
      <p>{pokeData.name}</p>
      <p>{pokeData.id}</p>
      <p>{pokeData.weight}</p>
      <img src={pokeData.sprites?.front_default} />
      <img src={pokeData.sprites?.front_shiny} />
      <p> {pokeData.types?.[0]?.type.name.toUpperCase()}</p>
    </div>
  );

  return (
    <div className="App">
      <h1>QUE POKE QUERÉS?</h1>

      <form>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Escribi el nombre..."
        />
      </form>

      <button onClick={submitTodoHandler} type="submit">
        Buscar
      </button>
      {!isLoading && <div>{dataFetched}</div>}
      {isLoading && <p>Pokecargando tu Pokémon... (isLoading en true)</p>}
    </div>
  );
}

export default App;
