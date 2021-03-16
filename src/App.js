import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [pokeData, setPokeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pokeData2, setPokeData2] = useState({});

  function handleChange(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  useEffect(() => {
    if (pokeData.types?.length > 1) {
      pokeData.types.map(async (item) => {
        const getData2 = await fetch(
          `https://pokeapi.co/api/v2/type/${item.type.name}`
        );
        const dataToJson = await getData2.json();
        setPokeData2(dataToJson);
      });
    }
    console.log(pokeData2);
  }, [pokeData]);

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

  const mapeo = pokeData.types?.map((type) => {
    return <p>{type.type.name}</p>;
  });

  const sprite = pokeData.sprites?.front_default;
  const effective = pokeData2.damage_relations?.double_damage_to?.map(
    (damage) => {
      return <p>{damage.name}</p>;
    }
  );

  const dataFetched = (
    <div>
      <p>{pokeData.name}</p>
      <p>{pokeData.id}</p>
      <img src={sprite} />
      {mapeo}

      <p> Es Super Efectivo contra: {effective}</p>
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
          placeholder="Escribi el nombre o ID..."
        />
      </form>

      <button onClick={submitTodoHandler} type="submit">
        Buscar
      </button>
      {!isLoading && <div>{dataFetched}</div>}
      {isLoading && ""}
    </div>
  );
}

export default App;
