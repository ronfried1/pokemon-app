import { Pokemon, pokemonApi } from "@/lib/api";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchPokemons = createAsyncThunk<
  Pokemon[],
  { offset: number; limit: number; favoritesOnly?: boolean; search?: string }
>("pokemon/fetchPokemons", async ({ offset, limit, favoritesOnly, search }) => {
  return await pokemonApi.fetchPokemons({
    offset,
    limit,
    favoritesOnly,
    search,
  });
});

export const toggleFavorite = createAsyncThunk<
  { id: number; isFavorite: boolean; favoritesOnly: boolean },
  { id: number; isFavorite: boolean; name: string; favoritesOnly: boolean }
>("pokemon/toggleFavorite", async ({ id, isFavorite, name, favoritesOnly }) => {
  await pokemonApi.toggleFavorite(id, isFavorite, name);
  return { id, isFavorite, favoritesOnly };
});

export const fetchFavorites = createAsyncThunk<{ id: number; name: string }[]>(
  "pokemon/fetchFavorites",
  async () => {
    return await pokemonApi.fetchFavorites();
  }
);

// Slice
interface PokemonState {
  pokemons: Pokemon[];
  favorites: { id: number; name: string }[];
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: PokemonState = {
  pokemons: [],
  favorites: [],
  loading: false,
  error: null,
  page: 0,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    resetPokemons(state) {
      state.pokemons = [];
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        if (state.page === 0) {
          state.pokemons = action.payload;
        } else {
          state.pokemons = [...state.pokemons, ...action.payload];
        }
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pokemons";
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { id, isFavorite, favoritesOnly } = action.payload;
        const pokemon = state.pokemons.find((p) => p.id === id);

        // Update isFavorite state in the pokemon object if found
        if (pokemon) {
          pokemon.isFavorite = isFavorite;

          // Update favorites list based on the new state
          if (isFavorite) {
            // Add to favorites if not already there
            const existsInFavorites = state.favorites.some((f) => f.id === id);
            if (!existsInFavorites) {
              state.favorites.push({
                id,
                name: pokemon.name || `Pokemon ${id}`,
              });
            }
          } else {
            // Remove from favorites
            state.favorites = state.favorites.filter((f) => f.id !== id);

            // If in favorites-only view, remove from pokemons list as well
            if (favoritesOnly) {
              state.pokemons = state.pokemons.filter((p) => p.id !== id);
            }
          }
        }
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { setPage, resetPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
