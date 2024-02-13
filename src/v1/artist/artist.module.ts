// Nest dependencies
import { Module } from '@nestjs/common';

// Local files
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { FavoritesRepository } from '../../shared/repositories/favorites.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [FavoritesModule],
  controllers: [ArtistController],
  providers: [
    ArtistService,
    ArtistRepository,
    TrackRepository,
    FavoritesRepository,
    AlbumRepository,
  ],
})
export class ArtistModule {}
