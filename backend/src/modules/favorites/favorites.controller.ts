import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Logger,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  private readonly logger = new Logger(FavoritesController.name);
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post(':id')
  addFavorite(@Param('id') id: string, @Query('name') name: string) {
    this.logger.log(`Adding favorite: ${id}`);
    return this.favoritesService.addFavorite(id, name);
  }

  @Delete(':id')
  removeFavorite(@Param('id') id: string) {
    return this.favoritesService.removeFavorite(id);
  }
}
