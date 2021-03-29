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

  const pokeTypes = pokeData.types?.map((type) => {
    return (
      <p className="capitalized" key={type.name}>
        {type.type.name}
      </p>
    );
  });

  const pokeTypes2 = (
    <>
      <h2>Type:</h2> {pokeTypes}
    </>
  );

  const weakness = pokeData2[0]?.damage_relations?.double_damage_from.map(
    (item) => {
      return <span className="weakness-style"> {item.name} </span>;
    }
  );

  const weakTo = (
    <>
      <h2>Weak to:</h2>
    </>
  );

  const effectiveness = pokeData2[0]?.damage_relations?.double_damage_to.map(
    (items) => {
      return <span className="weakness-style"> {items.name} </span>;
    }
  );

  const effectiveTo = (
    <>
      <h2>Effective to:</h2>
    </>
  );

  const sprite = pokeData.sprites?.front_default;

  const dataFetched = (
    <>
      <div id="" className="flex-name-sprite">
        <h2>{pokeData.name}</h2> <img src={sprite} />
      </div>
      <h3>Pokedex N°: {pokeData.id}</h3>
      {pokeTypes2}
      {weakTo} <div className="flex-weakness">{weakness}</div>
      {effectiveTo} <div className="flex-weakness">{effectiveness}</div>
    </>
  );

  return (
    <div className="App">
      <h1 className="title">QUE POKE QUERÉS?</h1>

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
      <div className="info-fetched">
        {!isLoading && <div>{dataFetched}</div>}
        {isLoading && ""}
      </div>
    </div>
  );
}

export default App;
