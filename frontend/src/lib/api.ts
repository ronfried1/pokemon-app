import axios from "axios";
import { z } from "zod";

// Define Zod schemas
const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  spriteUrl: z.string().url(),
  isFavorite: z.boolean(),
});

const PokemonListSchema = z.array(PokemonSchema);

const PokemonAbilitySchema = z.object({
  ability: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  is_hidden: z.boolean(),
  slot: z.number(),
});

const PokemonStatSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

const PokemonMoveSchema = z.object({
  move: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

const PokemonEvolutionSchema = z.object({
  id: z.number(),
  name: z.string(),
  spriteUrl: z.string().url(),
  condition: z.string().optional(),
});

const PokemonDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  abilities: z.array(PokemonAbilitySchema),
  height: z.number(),
  weight: z.number(),
  stats: z.array(PokemonStatSchema),
  moves: z.array(PokemonMoveSchema),
  sprites: z.object({
    front_artwork: z.string().url(),
    front: z.string().url(),
    back: z.string().url(),
    front_shiny: z.string().url(),
    back_shiny: z.string().url(),
  }),
  evolutionChain: z.array(PokemonEvolutionSchema),
  description: z.string(),
  isFavorite: z.boolean(),
  base_experience: z.number(),
});

const FavoriteSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const FavoriteListSchema = z.array(FavoriteSchema);
export type Pokemon = z.infer<typeof PokemonSchema>;

// Set up axios instance
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API methods
export const pokemonApi = {
  fetchPokemons: async ({
    offset,
    limit,
    favoritesOnly,
    search,
  }: {
    offset: number;
    limit: number;
    favoritesOnly?: boolean;
    search?: string;
  }): Promise<Pokemon[]> => {
    const params = new URLSearchParams();
    params.append("offset", offset.toString());
    params.append("limit", limit.toString());
    if (favoritesOnly) params.append("favoritesOnly", "true");
    if (search) params.append("search", search);

    const response = await api.get(`/pokemon?${params.toString()}`);

    return PokemonListSchema.parse(response.data);
  },

  fetchFavorites: async (): Promise<{ id: number; name: string }[]> => {
    const response = await api.get("/favorites");
    return FavoriteListSchema.parse(response.data);
  },

  toggleFavorite: async (
    id: number,
    isFavorite: boolean,
    name: string
  ): Promise<void> => {
    const params = new URLSearchParams();
    params.append("name", name);

    if (isFavorite) {
      await api.post(`/favorites/${id}?${params.toString()}`);
    } else {
      await api.delete(`/favorites/${id}`);
    }
  },

  fetchPokemonDetails: async (id: number) => {
    const response = await api.get(`/pokemon/${id}`);
    return PokemonDetailsSchema.parse(response.data);
  },
};
