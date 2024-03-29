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
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Other dependencies
import { Sequelize } from 'sequelize-typescript';

// Local files
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FilterArtistDto } from './dto/filter-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private sequelize: Sequelize,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiFoundResponse({
    description: 'Found record',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all artist' })
  @ApiOkResponse({
    description: 'Successfully all record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server',
  })
  findAll(@Query() filterArtistDto: FilterArtistDto) {
    return this.artistService.findAll(filterArtistDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a artist by ID' })
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
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a artist by ID' })
  @ApiOkResponse({
    description: 'Artist updated information successfully',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  @ApiForbiddenResponse({
    description: 'Not match old password',
  })
  @ApiConflictResponse({
    description: 'Conflict artist name',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error service with database',
  })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a artist by ID' })
  @ApiNoContentResponse({ description: 'Artist deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  async remove(@Param('id') id: string) {
    const result = await this.sequelize.transaction(async (transaction) => {
      return await this.artistService.remove(id, transaction);
    });

    return result;
  }
}
