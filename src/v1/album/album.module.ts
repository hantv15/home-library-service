// Nest dependencies
import { Module } from '@nestjs/common';

// Local files
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { FavoritesModule } from '../favorites/favorites.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [FavoritesModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, ArtistRepository, TrackRepository],
})
export class AlbumModule {}
