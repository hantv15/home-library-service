// Nest dependencies
import { Controller, Delete, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// Local files
import { FavoritesService } from './favorites.service';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  @ApiOkResponse({
    description: 'Add successfully track id to favorite',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  createTrack(@Param('id') id: string) {
    return this.favoritesService.createTrack(id);
  }

  @Delete('track/:id')
  @ApiNoContentResponse({ description: 'Track deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @ApiOkResponse({
    description: 'Add successfully Album id to favorite',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  createAlbum(@Param('id') id: string) {
    return this.favoritesService.createAlbum(id);
  }

  @Delete('album/:id')
  @ApiNoContentResponse({ description: 'Album deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiOkResponse({
    description: 'Add successfully Artist id to favorite',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  createArtist(@Param('id') id: string) {
    return this.favoritesService.createArtist(id);
  }

  @Delete('artist/:id')
  @ApiNoContentResponse({ description: 'Artist deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
