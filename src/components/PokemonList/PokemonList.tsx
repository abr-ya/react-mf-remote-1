import { useEffect } from "react";
import { useAtom } from "jotai";

import useSelectPokemon, { addAllPokemons, pokemons as pokemonState } from "@/atoms/Pokemon";

import style from "./PokemonList.module.css";
import { IPokemon } from "@/types/Pokemon";

const PokemonList = () => {
  const [, addPokemons] = useAtom(addAllPokemons);
  const [pokemons] = useAtom(pokemonState);
  const [, setSelectPokemon] = useSelectPokemon();

  const fetchPokemons = async () => {
    const response = await fetch("https://raw.githubusercontent.com/abr-ya/mocks/master/pokemonList.json");
    const jsonData = await response.json();
    addPokemons(jsonData);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const selectPokemonHandler = (pokemon: IPokemon) => {
    console.log("remote1 == select pokemon:", pokemon.name);
    setSelectPokemon(pokemon);
  };

  return (
    <div className={style.container}>
      <h1>Pokemons List Vite MF Micro Frontend</h1>
      <p>
        Pokemon data for details shared by{" "}
        <a href="https://jotai.org/" target="_blank">
          Jotai
        </a>
      </p>
      <div className={style.pokemonCardContainer}>
        {pokemons.map((pokemon) => (
          <div className={style.pokemonCard} key={pokemon.id} onClick={() => selectPokemonHandler(pokemon)}>
            <img src={pokemon.sprite} aria-label={`Image of pokemon ${pokemon.name}`} />
            <label>{pokemon.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
