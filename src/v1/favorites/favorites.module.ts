// Nest dependencies
import { Module } from '@nestjs/common';

// Local files
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { FavoritesRepository } from '../../shared/repositories/favorites.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    TrackRepository,
    AlbumRepository,
    ArtistRepository,
    FavoritesRepository,
  ],
})
export class FavoritesModule {}
