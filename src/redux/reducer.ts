import { createSlice } from '@reduxjs/toolkit';

export interface FavoritesState {
  favoriteCharacters: string[]
};

const initialState = { favoriteCharacters: [] } as FavoritesState;

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favoriteCharacters.find(e => e === action.payload))
        state.favoriteCharacters.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(e => e !== action.payload);
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
