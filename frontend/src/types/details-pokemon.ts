export interface PokemonDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

export interface PokemonDetails {
  id: number;
  name: string;
  isFavorite: boolean;
  types: string[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  evolutionChain: PokemonEvolution[];
  sprites: PokemonSprites;
  description: string;
  height: number;
  weight: number;
  base_experience: number;
}

export interface PokemonSprites {
  front_artwork: string;
  front: string;
  back: string;
  front_shiny: string;
  back_shiny: string;
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
  };
}

export interface PokemonEvolution {
  id: number;
  name: string;
  spriteUrl: string;
  condition?: string;
}
