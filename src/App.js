import React, { useEffect, useState } from "react";
import "./reset.css";
import Input from "./Components/Input";
import Button from "./Components/Button";
import "./App.scss";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [pokeData, setPokeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pokeData2, setPokeData2] = useState({});

  function handleCallback(value) {
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

  async function submitPoke() {
    if (inputValue != "") {
      const getData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`
      );
      const dataToJson = await getData.json();
      setPokeData(dataToJson);
      setInputValue("");
      console.log(dataToJson);
      setIsLoading(false);
    }
  }

  function handleEnter(keyCode) {
    if (keyCode === 13) {
      submitPoke();
    }
  }

  const pokeTypes = pokeData.types?.map((type) => {
    return (
      <li className="pokeType" key={type.name}>
        {type.type.name}
      </li>
    );
  });

  const pokeTypes2 = (
    <div className="pokeTypeContainer">
      <h2 className="type">Type: </h2> {pokeTypes}
    </div>
  );

  const weakTo = (
    <>
      <h2 className="pokeInfo">Weak to:</h2>
    </>
  );
  const weakness = pokeData2[0]?.damage_relations?.double_damage_from.map(
    (item) => {
      return <li className="fetchdata-style"> {item.name} </li>;
    }
  );

  const weakness2 = pokeData2[1]?.damage_relations?.double_damage_from.map(
    (item) => {
      return <li className="fetchdata-style"> {item.name} </li>;
    }
  );

  const effectiveTo = (
    <>
      <h2 className="pokeInfo">Effective to:</h2>
    </>
  );

  const effective = pokeData2[0]?.damage_relations?.double_damage_to.map(
    (items) => {
      return <li className="fetchdata-style"> {items.name} </li>;
    }
  );

  const effective2 = pokeData2[1]?.damage_relations?.double_damage_to.map(
    (items) => {
      return (
        <>
          <li className="fetchdata-style"> {items.name} </li>
        </>
      );
    }
  );

  const sprite = pokeData.sprites?.front_default;

  const dataFetched = (
    <>
      <img className="sprite" src={sprite} />{" "}
      <h2 className="pokeName">{pokeData.name}</h2>
      <h3 className="pokeId">Pokedex N°: {pokeData.id}</h3>
      {pokeTypes2}
      <div className="we-container">
        <div className="effectiveness">
          {effectiveTo} {effective} {effective2}
        </div>
        <div className="weakness">
          {weakTo} {weakness} {weakness2}
        </div>
      </div>
      <div className="button-container">
        <a src="#" className="close-button" onClick={refresh}>
          Close
        </a>
      </div>
    </>
  );

  function refresh(e) {
    e.preventDefault();
    window.location.reload(false);
  }

  return (
    <div className="content-container">
      <div className="search-bar-container">
        <h1 onClick={refresh} className="title">
          FIND YOUR POKEMON
        </h1>
        <form className="form-style">
          <Input
            value={inputValue}
            onChange={handleCallback}
            onKeyDown={handleEnter}
          />
          <Button onClick={submitPoke} />
        </form>
      </div>

      <div className="info-fetched">
        {!isLoading && <div className="dataFetched">{dataFetched}</div>}
        {isLoading && ""}
      </div>
    </div>
  );
}

export default App;
