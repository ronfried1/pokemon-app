import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { FavoritesService } from '../favorites/favorites.service';
import {
  ChainNode,
  EnrichedPokemon,
  PokeApiListResponse,
  PokeApiPokemonDetails,
  PokeApiPokemonSpecies,
} from './pokemon.types';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  private readonly pokeApiBaseUrl = 'https://pokeapi.co/api/v2';
  private readonly MAX_ALLOWED_POKEMON = 150;

  constructor(private readonly favoritesService: FavoritesService) {
    this.logger.log('PokemonService initialized');
  }

  async getPokemonList(
    offset: number,
    limit: number,
    search?: string,
    favoritesOnly?: boolean,
  ): Promise<EnrichedPokemon[]> {
    this.logger.log(
      `Fetching pokemon list: offset=${offset}, limit=${limit}, search=${search || 'none'}, favoritesOnly=${favoritesOnly}`,
    );

    try {
      if (favoritesOnly) {
        const favoriteIds = await this.favoritesService.getFavorites(
          search,
          offset,
          limit,
        );
        this.logger.log(`Found ${favoriteIds.length} favorite Pokemon`);

        const favorites: EnrichedPokemon[] = await Promise.all(
          favoriteIds.map(async (id) => {
            const details = await this.fetchPokemonDetails(id.name);
            return this.mapToPokemonEntity(details, true);
          }),
        );

        this.logger.log(`Returning ${favorites.length} favorite Pokemon`);
        return favorites;
      } else {
        if (search) {
          // Fetch all Pokemon and filter them
          const { data: allPokemon } = await axios.get<PokeApiListResponse>(
            `${this.pokeApiBaseUrl}/pokemon?offset=0&limit=150`,
          );
          const filteredPokemon = allPokemon.results.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
          );

          const pokemons: EnrichedPokemon[] = await Promise.all(
            filteredPokemon.map(async (pokemon) => {
              const details = await this.fetchPokemonDetails(pokemon.name);
              const isFavorite = await this.favoritesService.isFavorite(
                details.id,
              );
              return this.mapToPokemonEntity(details, isFavorite);
            }),
          );

          return pokemons.slice(offset, offset + limit);
        }
        const effectiveOffset = Math.min(offset, this.MAX_ALLOWED_POKEMON);
        const effectiveLimit = Math.min(
          limit,
          this.MAX_ALLOWED_POKEMON - effectiveOffset,
        );

        const { data } = await axios.get<PokeApiListResponse>(
          `${this.pokeApiBaseUrl}/pokemon?offset=${effectiveOffset}&limit=${effectiveLimit}`,
        );
        this.logger.log(
          `Retrieved ${data.results.length} Pokemon from PokeAPI`,
        );

        const pokemons: EnrichedPokemon[] = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await this.fetchPokemonDetails(pokemon.name);
            const isFavorite = await this.favoritesService.isFavorite(
              details.id,
            );
            return this.mapToPokemonEntity(details, isFavorite);
          }),
        );

        this.logger.log(`Returning ${pokemons.length} Pokemon`);
        return pokemons;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Error fetching Pokemon list: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getPokemonDetails(idOrName: string): Promise<{
    id: number;
    name: string;
    types: string[];
    sprites: any;
    isFavorite: boolean;
    stats: any[];
    moves: any[];
    evolutionChain: { id: number; name: string; spriteUrl: string }[];
    description: string;
    height: number;
    weight: number;
    base_experience: number;
    abilities: any[];
  }> {
    this.logger.log(`Fetching detailed information for Pokemon: ${idOrName}`);

    try {
      // 1. Fetch base Pokémon data
      this.logger.log(`Fetching base Pokemon data for: ${idOrName}`);
      const { data: details } = await axios.get<PokeApiPokemonDetails>(
        `${this.pokeApiBaseUrl}/pokemon/${idOrName}`,
      );
      this.logger.log(
        `Retrieved base data for Pokemon: ${details.name} (ID: ${details.id})`,
      );

      // 2. Fetch Pokémon species data
      this.logger.log(`Fetching species data for Pokemon: ${idOrName}`);
      const { data: species } = await axios.get<PokeApiPokemonSpecies>(
        `${this.pokeApiBaseUrl}/pokemon-species/${idOrName}`,
      );
      this.logger.log(`Retrieved species data for Pokemon: ${species.name}`);

      // 3. Fetch evolution chain
      this.logger.log(
        `Fetching evolution chain from: ${species.evolution_chain.url}`,
      );
      const { data: evolutionData } = await axios.get<{
        chain: ChainNode;
      }>(species.evolution_chain.url);

      const evolutionChain = await this.extractEvolutionChain(
        evolutionData.chain,
      );
      this.logger.log(
        `Extracted evolution chain with ${evolutionChain.length} evolutionary forms`,
      );

      const isFavorite = await this.favoritesService.isFavorite(details.id);
      this.logger.log(
        `Pokemon ${details.name} isFavorite status: ${isFavorite}`,
      );

      return {
        id: details.id,
        name: details.name,
        types: details.types.map((t) => t.type.name),
        sprites: this.extractSprites(details.sprites),
        isFavorite,
        stats: details.stats,
        moves: details.moves,
        evolutionChain,
        description: (
          species.flavor_text_entries.find(
            (entry) => entry.language.name === 'en',
          )?.flavor_text || 'No description available'
        ).replace(/\f/g, ' '),
        height: details.height,
        weight: details.weight,
        base_experience: details.base_experience,
        abilities: details.abilities,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Error fetching Pokemon details for ${idOrName}: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  // Helper to extract evolution chain
  private async extractEvolutionChain(chainNode: ChainNode) {
    this.logger.log('Extracting evolution chain from chain node');
    const chain: { id: number; name: string; spriteUrl: string }[] = [];

    try {
      let current = chainNode;
      while (current) {
        const { url } = current.species;
        const id = this.extractIdFromSpeciesUrl(url);
        this.logger.log(
          `Fetching details for evolution chain member: ${current.species.name} (ID: ${id})`,
        );

        const details = await this.fetchPokemonDetails(id.toString());

        chain.push({
          id: details.id,
          name: details.name,
          spriteUrl:
            details.sprites.other?.['official-artwork']?.front_default || '',
        });
        this.logger.log(`Added ${details.name} to evolution chain`);

        if (current.evolves_to && current.evolves_to.length > 0) {
          this.logger.log(
            `${current.species.name} evolves to ${current.evolves_to[0].species.name}`,
          );
          current = current.evolves_to[0];
        } else {
          this.logger.log(`${current.species.name} is the final evolution`);
          break;
        }
      }

      this.logger.log(
        `Evolution chain extraction complete. Chain has ${chain.length} members`,
      );
      return chain;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Error extracting evolution chain: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  private extractSprites(sprites: PokeApiPokemonDetails['sprites']) {
    this.logger.log('Extracting sprite URLs from Pokemon sprites data');
    return {
      front:
        sprites.other?.dream_world?.front_default ||
        sprites.other?.['official-artwork']?.front_default ||
        sprites.other?.home?.front_default ||
        sprites.front_default ||
        '',
      back:
        sprites.back_default ||
        sprites.versions?.['generation-v']?.['black-white']?.animated
          ?.back_default ||
        '',
      front_shiny:
        sprites.other?.home?.front_shiny ||
        sprites.versions?.['generation-v']?.['black-white']?.animated
          ?.front_shiny ||
        sprites.front_shiny ||
        '',
      back_shiny:
        sprites.back_shiny ||
        sprites.versions?.['generation-v']?.['black-white']?.animated
          ?.back_shiny ||
        '',
      front_artwork: sprites.other?.['official-artwork']?.front_default || '',
    };
  }

  // Helper to extract ID from species URL
  private extractIdFromSpeciesUrl(url: string): number {
    const parts = url.split('/').filter(Boolean); // Remove empty strings
    const id = Number(parts[parts.length - 1]);
    this.logger.debug(`Extracted ID ${id} from URL: ${url}`);
    return id;
  }

  private async fetchPokemonDetails(
    name: string,
  ): Promise<PokeApiPokemonDetails> {
    try {
      this.logger.debug(`Fetching Pokemon details for: ${name}`);
      const { data } = await axios.get<PokeApiPokemonDetails>(
        `${this.pokeApiBaseUrl}/pokemon/${name}`,
      );
      this.logger.debug(
        `Successfully retrieved details for Pokemon: ${data.name} (ID: ${data.id})`,
      );
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Error fetching Pokemon details for ${name}: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  // Helper to map Pokemon details to entity
  private mapToPokemonEntity(
    details: PokeApiPokemonDetails,
    isFavorite: boolean,
  ): EnrichedPokemon {
    return {
      id: details.id,
      name: details.name,
      types: details.types.map((t) => t.type.name),
      spriteUrl:
        details.sprites.other?.['official-artwork']?.front_default || '',
      isFavorite,
    };
  }
}
