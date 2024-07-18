import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pokemon } from '../types/pokemon';

interface PokemonState {
  pokemons: Pokemon[];
  currentPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  currentPokemon: null,
  loading: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async () => {
    const response = await axios.get('http://localhost:3001/pokemons');
    return response.data;
  }
);

export const fetchPokemonById = createAsyncThunk(
  'pokemons/fetchPokemonById',
  async (id: number) => {
    const response = await axios.get(`http://localhost:3001/pokemons/?id=${id}`);
    return response.data[0];
  }
);

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchPokemons.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchPokemonById.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(fetchPokemonById.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.currentPokemon = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default pokemonSlice.reducer;