// Nest dependencies
import { Module } from '@nestjs/common';

// Local files
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
