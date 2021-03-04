import React, { useState } from "react";

import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [pokeData, setPokeData] = useState("");
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
    setIsLoading(false);
    console.log(dataToJson);

    const getData2 = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${inputValue}`
    );
    const dataToJson2 = await getData2.json();
    setPokeData(dataToJson2);
    setInputValue("");
    setIsLoading(false);
    console.log(dataToJson2);
  }
  /*  if (isLoading) {
    return (
      <div>
        <p>Pokecargando tu Pokémon...</p>
      </div>
    );
  }*/

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

      <div>
        <p>Numero de Pokedex {pokeData.id}</p>
        <p>{pokeData.chain.evolves_to[0].species.name}</p>

        <p>{pokeData.weight}</p>
      </div>
    </div>
  );
}

export default App;
