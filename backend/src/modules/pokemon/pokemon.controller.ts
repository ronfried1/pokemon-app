import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getEnrichedPokemonList(
    @Query('offset') offset = 0,
    @Query('limit') limit = 15,
    @Query('search') search?: string,
    @Query('favoritesOnly') favoritesOnly?: boolean,
  ) {
    return this.pokemonService.getPokemonList(
      +offset,
      +limit,
      search,
      favoritesOnly,
    );
  }

  @Get(':id')
  getPokemonDetails(@Param('id') id: string) {
    return this.pokemonService.getPokemonDetails(id);
  }
}
