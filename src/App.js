import { GlobalContext } from "./contexts/GlobalContext";
import Router from "./router/Router";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constants/url";

export default function App() {

  const [pokelist, setPokelist] = useState([]);
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    fetchPokelist();
  }, []);

  const fetchPokelist = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setPokelist(response.data.results);
    } catch (error) {
      console.log("Erro ao buscar lista de pokemons");
      console.log(error.response);
    } 
  };

  const addToPokedex = (pokemonToAdd) => {
    const isAlreadyOnPokedex = pokedex.find(
      (pokemonInPokedex) => pokemonInPokedex.name === pokemonToAdd.name
    );

    if (!isAlreadyOnPokedex) {
      const newPokedex = [...pokedex, pokemonToAdd];
      setPokedex(newPokedex);
    }
  };

  const removeFromPokedex = (pokemonToRemove) => {
    const newPokedex = pokedex.filter(
      (pokemonInPokedex) => pokemonInPokedex.name !== pokemonToRemove.name
    );

    setPokedex(newPokedex);
  };

  

  const filteredPokelist = () =>
    pokelist.filter(
      (pokemonInList) =>
        !pokedex.find(
          (pokemonInPokedex) => pokemonInList.name === pokemonInPokedex.name
        )
    );

    

 
  
  const context = {
    pokelist,
    setPokelist,
    pokedex,
    setPokedex,
    fetchPokelist,
    addToPokedex,
    removeFromPokedex,
    filteredPokelist
  }

  return (
    <>
    <GlobalContext.Provider value={context}>
      <Router />
    </GlobalContext.Provider>
    </>
  );
}
