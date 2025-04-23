export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}
export type PokemonSpritesOther = Record<string, Record<string, string | null>>;

export interface PokeApiPokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_shiny: string;
    back_default: string;
    other: PokemonSpritesOther;
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            back_default: string;
            front_default: string;
            back_shiny: string;
            front_shiny: string;
          };
        };
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
}

export interface EnrichedPokemon {
  id: number;
  name: string;
  types: string[];
  spriteUrl: string;
  isFavorite: boolean;
}

export interface PokeApiPokemonSpecies {
  name: string;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export interface ChainNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainNode[];
  evolution_details: EvolutionDetail[];
}

interface EvolutionDetail {
  min_level?: number;
  item?: {
    name: string;
  };
  trigger?: {
    name: string;
  };
}
