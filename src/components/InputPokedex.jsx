import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from './store/slices/name.slice';

const InputPokedex = () => {
    const [userName, setUserName]=useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const enterName = ()=>{
        dispatch(changeName(userName))
        // alert(userName)
        navigate('/pokedex')
    }

    return (
        <div className='pokedex_main'>
           
            <h2>Hello trainer!</h2>
            <img className='img_a' src="	https://www.seekpng.com/png/full/201-2011786_red-by-xous-54-red-pokemon-trainer-png.png" alt="" />
            <p>give me your name to star</p>
            <input 
            className='ipt'
            type="text" 
            onChange={e=>setUserName(e.target.value)}
            value={userName}
            />
            <button className='btn' onClick={enterName}>enter</button>

            {/* <button onClick={()=>navigate(-1)}>ir Atras</button> */}
        </div>
    );
};

export default InputPokedex;