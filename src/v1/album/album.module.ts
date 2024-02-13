// Nest dependencies
import { Module } from '@nestjs/common';

// Local files
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, ArtistRepository],
})
export class AlbumModule {}
