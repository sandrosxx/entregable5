import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';


const Pokedex = () => {

    const userName = useSelector(state=>state.name);
    
    const [pokedex, setPokedex]= useState([]);

    const [pokemon, setPokemon]= useState('');

    const [typeOfPokemon, setTypeOfPokemon]=useState([]);
    console.log(typeOfPokemon)

    const navigate= useNavigate();

    useEffect(() => {
        const url= 'https://pokeapi.co/api/v2'
        // https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154
        axios.get(`${url}/pokemon/`).then(res => setPokedex(res.data.results)).catch(error=>console.log(error.response));
        
        axios.get(`${url}/type/`).then(res => setTypeOfPokemon(res.data.results)).catch(error=>console.log(error.response));

    },[])

    const searchPokemon =()=>{
        navigate(`/pokedex/${pokemon.toLowerCase()}`)
    }

    const filterType = (url) => {
        
        axios.get(url).then(res=>setPokedex(res.data.pokemon));
    }
    const [page, setPage]=useState(1);
    const pokedexPerPage = 10;
    const lastIndex = page * pokedexPerPage;
    const firstIndex = lastIndex-pokedexPerPage;
    const pokedexPaginated = pokedex.slice(firstIndex, lastIndex)
    const totalPages= Math.ceil(pokedex.length/pokedexPerPage);
    
    const numbers=[];
    for (let i = 1;  i <= totalPages; i++) {
        numbers.push(i);
    }
    
    // console.log(pokemon);
    return (
        <div >
            
            <div className="pokedex__header">
                <button className='btn-n' onClick={()=>navigate(-1)}>back</button>
                <h1>Pokedex</h1>
                <p>Welcome {userName}, here you can find your favorite pokemon</p>
            </div>
            
            <div>
                <input 
                    className='inp_pokedex'
                    type="text" 
                    placeholder= 'search pokemon'
                    value={pokemon}
                    onChange={e=>setPokemon(e.target.value)}
                />
                <button className='search' onClick={searchPokemon}>search</button>
                <select className='select_pokedex' onChange={e=>filterType(e.target.value)}      name="" id="">
                    {typeOfPokemon.map(typeOf=>(
                        <option 
                            value={typeOf.url} 
                            key={typeOf.name}
                        >
                            {typeOf.name}
                        </option>
                    ))}
                </select>
                <div className='pagination'>
                <button 
                    onClick={()=> setPage(page -1)}
                    disabled={page===1}
                >
                    Prev 
                </button>
                
                {numbers.map(number=>(
                    <button key={number} onClick={()=>setPage(number)}>{number}</button>
                ))}
                <button 
                    onClick={()=>setPage(page +1)}
                    disabled={page===totalPages}
                >
                    Next
                </button>
                </div>
            </div>

            <div className="pokedex__main">
                <div className="pokemons__list">
                       {pokedexPaginated.map(pokemon=>(
                        <PokemonCard 
                        url={pokemon.url ? pokemon.url : pokemon.pokemon?.url} 
                        key={pokemon.url ? pokemon.url : pokemon.pokemon?.url} 
                    />                
                    ))}
                 </div>
            </div>
           
        </div>
    );
};

export default Pokedex;