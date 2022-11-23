import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/divider.png'

const PokemonCard = ({url}) => {
    const [pokemon, setPokemon]=useState({});

    useEffect(()=>{
        axios.get(url).then(res=>setPokemon(res.data));
    },[]);

    console.log(pokemon);
    return (
        <Link to={`/pokedex/${pokemon.id}`} >
            <div className={`card-poke border-${pokemon.types?.[0].type.name}`} >
                
                <div className={`card-poke__header bg-${pokemon.types?.[0].type.name}`}>
                        <div className='card-poke__img' > 
                        <img  src={pokemon.sprites?.other['official-artwork'].front_default} alt="img" />
                        </div>
                </div>
                
                <div className='card-poke__body'>
                    <h2 className={'card-poke__name letter-type' }>{pokemon.name}</h2>
                    <p className='card-poke__type-label'>Type</p>
                    <ul className='card-poke__list'>
                    { pokemon.types?.map(type =>(
                            <li className='card-poke__type' key={type.slot} >{type.type.name}</li>
                            ))
                        }
                    </ul>
                </div>
                
                <div className='linea_divider'>
                <img src={img} alt="line" />
                </div>
                
                <ul className='card-poke__stats-container'>
                {pokemon.stats?.map(stat =>(
                   <li className='card-poke__stat' key={stat.stat.name}>
                        <span className='card-poke__stat-label'>
                            {stat.stat.name}
                        </span>
                        <span className={`card-poke__stat-number letter-type`}>
                            {stat.base_stat}
                        </span>
                    </li>
                    ))
                }
                </ul>
  
             </div>
            
        </Link>
    );
};

export default PokemonCard;