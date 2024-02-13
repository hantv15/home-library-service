// Nest dependencies
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// Local files
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FilterAlbumDto } from './dto/filter-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
@ApiTags('Albums')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private sequelize: Sequelize,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The album has been successfully created',
  })
  @ApiConflictResponse({
    description: 'Conflict name album',
  })
  @ApiNotFoundResponse({
    description: 'Not found album by ID or Artist',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error service with database',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully all record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server',
  })
  findAll(@Query() filterAlbumDto: FilterAlbumDto) {
    return this.albumService.findAll(filterAlbumDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Response record by id',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Album updated password successfully',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Album deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  async remove(@Param('id') id: string) {
    const result = await this.sequelize.transaction(
      async (transaction: Transaction) => {
        return this.albumService.remove(id, transaction);
      },
    );

    return result;
  }
}
