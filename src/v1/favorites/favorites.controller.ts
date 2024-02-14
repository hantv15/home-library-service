// Nest dependencies
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// Local files
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { FavoritesService } from './favorites.service';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private sequelize: Sequelize,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully all record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server',
  })
  async findAll() {
    const result = await this.sequelize.transaction(
      async (transaction: Transaction) => {
        return await this.favoritesService.findAll(transaction);
      },
    );

    return result;
  }

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
  async removeTrack(@Param('id') id: string) {
    const result = await this.sequelize.transaction(
      async (transaction: Transaction) => {
        return await this.favoritesService.removeTrack(id, transaction);
      },
    );

    return result;
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
  async removeAlbum(@Param('id') id: string) {
    const result = await this.sequelize.transaction(
      async (transaction: Transaction) => {
        return this.favoritesService.removeAlbum(id, transaction);
      },
    );

    return result;
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
  async removeArtist(@Param('id') id: string) {
    const result = await this.sequelize.transaction(async (transaction) => {
      return await this.favoritesService.removeArtist(id, transaction);
    });

    return result;
  }
}
