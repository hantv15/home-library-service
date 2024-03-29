// Nest dependencies
import { Module } from '@nestjs/common';

// Local files
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [FavoritesModule],
  controllers: [TrackController],
  providers: [TrackService, TrackRepository, AlbumRepository, ArtistRepository],
})
export class TrackModule {}
