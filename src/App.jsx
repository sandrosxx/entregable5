import { useState } from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import InputPokedex from './components/InputPokedex';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element ={<InputPokedex/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path='/pokedex' element ={<Pokedex/>}/>
          <Route path='/pokedex/:id' element ={<PokemonDetail/>}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
