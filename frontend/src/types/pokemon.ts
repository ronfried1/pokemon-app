export interface Pokemon {
  id: number;
  name: string;
  types?: string[] | { type: { name: string } }[];
  spriteUrl?: string;
  isFavorite?: boolean;
}
