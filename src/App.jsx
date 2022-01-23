import { useEffect, useState } from "react";
import "./App.scss";
import { PokemonBox } from "./components/index";
import { AiOutlinePlusCircle } from "react-icons/ai";
import button from "./button.svg";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  async function getAllPokemons() {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <div className="container">
        <div className="heading">
          <p className="pokedex-logo">
            Poke<span>D</span>ex
          </p>
          <img className="button" src={button} alt="Button" />
        </div>
        <div className="flex">
          {allPokemons.map((item, index) =>
            item.types[1] === undefined ? (
              <PokemonBox
                key={index}
                id={item.id}
                name={capitalizeFirstLetter(item.name)}
                type={capitalizeFirstLetter(item.types[0].type.name)}
                image={item.sprites.other["official-artwork"].front_default}
              />
            ) : (
              <PokemonBox
                key={index}
                id={item.id}
                name={capitalizeFirstLetter(item.name)}
                type={capitalizeFirstLetter(item.types[0].type.name)}
                type2={capitalizeFirstLetter(item.types[1].type.name)}
                image={item.sprites.other["official-artwork"].front_default}
              />
            )
          )}
        </div>
        <div className="container-button">
          <button onClick={getAllPokemons}>
            <AiOutlinePlusCircle
              className="rotate-center"
              size="1.5rem"
            ></AiOutlinePlusCircle>
            Load More Pokemons
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
