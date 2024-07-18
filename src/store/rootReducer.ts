import { combineReducers } from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice';

const rootReducer = combineReducers({
  pokemon: pokemonSlice, 
});

export default rootReducer;
