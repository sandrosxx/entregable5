import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import line from '../assets/line.png'
import ball from '../assets/ball.png'

const PokemonDetail = () => {
    const[pokemon, setPokemon]=useState({});

    const navigate = useNavigate();

    const {id}= useParams();

    useEffect(()=>{
        const url= 'https://pokeapi.co/api/v2/pokemon/'
        axios.get(`${url}${id}/`).then(res=>setPokemon(res.data));
    },[id]);

    console.log(pokemon)

    return (
        <div className={`border-${pokemon.types?.[0].type.name}`} >
             <div className='detail__ball'>
                <img src={ball} alt="ball" />
            </div>
                            
            <button className='btn-n' onClick={()=>navigate(-1)}>back</button>
            <img className='img_p' src="https://logos-marcas.com/wp-content/uploads/2020/05/Pokemon-Logo.png" alt="" />
            <div className='container__principal'>
                <div className='pp'>
                <div className='detail__section1'>
                    <div className={`section1__rect bg-${pokemon.types?.[0].type.name}`} >
                        <img className='section1__img' src={pokemon.sprites?.other['official-artwork'].front_default} alt="" />
                    </div>
                    <div className="container-section1">
                    
                            <div className='section1__characterist1'>
                                <h2>Height</h2>
                                <span>{pokemon?.height}</span>
                            </div>
                            <div className='section1__characterist2'>
                                <h2>Weight</h2>
                                <span>{pokemon?.weight}</span>
                            </div>
                           
                        
                        <div className='section1__detail'>                      
                            <div className="section1__name">
                            <h2 className={`section1__name-text letter-${pokemon.types?.[0].type.name}`}>{pokemon?.name}</h2>
                            <p className={`container__name letter-${pokemon.types?.[0].type.name}`} ># {pokemon?.id}</p>
                            </div>
                         </div>
                       
                                              
                    </div>
                </div>
                <div className='section1__ta'>
                            <div className="section1__types">
                                <h2 >- Type -</h2>
                                <div className='ta__types'>
                                {
                                pokemon.types?.map(type => (
                                        <span className={`border-${type.type.name}`} key={type.slot}> {type.type.name}</span>
                                ))
                                }
                            </div>
                            </div>
                            <div className="section1__hability">
                                    <h2> - Abilities -</h2>
                                    <div className='ta__hability'>
                                    {
                                    pokemon.abilities?.map(abilitie => (
                                        <span key={abilitie.slot}> {abilitie.ability.name}</span>
                                    ))
                                    }
                                    </div>
                            </div>

                </div>
                <div className="section1_stat-container">
                            <div className="section__stat">
                                <h2 className='section1__title'>Stat</h2>
                                
                            </div>
                            <div className='detail__stat'>
                            {
                            pokemon.stats?.map(stat => (
                                <div key={stat.stat.name} className='stat__container'>
                                    <div className='stat__text'>
                                        <h3>{stat.stat.name}:</h3>
                                       
                                        <label>{stat.base_stat}/150</label>
                                    </div>
                                    <div className={`stat__bar star__bar--${stat.base_stat}`}> </div>
                                </div>
                            ))
                            }
                            </div>
                </div>
                </div>
                <div className='detail__M'>
                    <div className="detail__seccion">
                        <h3 className='detail__title'>Movements</h3>
                       
                            <div >
                                <img className='detail__line' src={line} alt="line" />
                            </div>
                           
                        
                    </div>
                    <div className='detail__movements'>
                    {
                    pokemon.moves?.map(move => (
                        <span key={move.move.name} className='detail__span'>
                            {move.move.name}
                        </span>
                    ))
                    }
                    </div>

                </div>
                
                
            </div>
                       
        </div>
    );
};

export default PokemonDetail;