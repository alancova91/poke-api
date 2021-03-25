import React, { useEffect, useState } from "react";
import data from "./data/typesData.json";

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
    if (pokeData.types?.length > 0) {
      const types = pokeData.types.map(async (item) => {
        const getData2 = await fetch(
          `https://pokeapi.co/api/v2/type/${item.type.name}`
        );
        const dataToJson = await getData2.json();
        return dataToJson;
      });

      Promise.all(types).then((data) => {
        console.log(data, "esto resuelve la promesa");
        setPokeData2(data);
      });
    }
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
    <>
      <h2>{pokeData.name}</h2>
      <p>{pokeData.id}</p>
      <img src={sprite} />
      {mapeo}
    </>
  );
  return (
    <div className="App">
      <h1>QUE POKE QUERÉS?</h1>

      <form>
        <input
          className="search-bar"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Escribi el nombre o ID..."
        />
      </form>

      <button
        className="search-button"
        onClick={submitTodoHandler}
        type="submit"
      >
        Buscar
      </button>
      {!isLoading && <div>{dataFetched}</div>}
      {isLoading && ""}
    </div>
  );
}

export default App;
