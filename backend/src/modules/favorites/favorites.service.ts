import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorites.schema';

interface FavoriteQuery {
  name?: { $regex: RegExp };
}
@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);

  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async getFavorites(
    search = '',
    offset = 0,
    limit = 15,
  ): Promise<{ name: string; id: number }[]> {
    const query: FavoriteQuery = {};

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    const favorites = await this.favoriteModel
      .find(query)
      .skip(offset)
      .limit(limit);
    return favorites.map((fav) => ({ name: fav.name, id: fav.pokemonId }));
  }

  async addFavorite(
    id: number | string,
    name: string,
  ): Promise<{ success: true }> {
    this.logger.log(`Adding favorite: ${id}`);
    const pokemonId = Number(id);
    const existing = await this.favoriteModel.findOne({ pokemonId });
    this.logger.log(`favorite: ${id} is ${existing ? 'already' : 'not'} added`);
    if (!existing) {
      await this.favoriteModel.create({ pokemonId, name });
      this.logger.log(`Added favorite Pokémon ID: ${pokemonId}`);
    } else {
      this.logger.log(`Favorite Pokémon ID: ${pokemonId} already exists`);
    }
    return { success: true };
  }

  async removeFavorite(id: number | string): Promise<{ success: true }> {
    const pokemonId = Number(id);
    await this.favoriteModel.deleteOne({ pokemonId });
    this.logger.log(`Removed favorite Pokémon ID: ${pokemonId}`);
    return { success: true };
  }

  async isFavorite(id: number): Promise<boolean> {
    const favorite = await this.favoriteModel.findOne({ pokemonId: id });
    return !!favorite;
  }
}
