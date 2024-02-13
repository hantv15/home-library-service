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
  ApiTags,
} from '@nestjs/swagger';

// Local files
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FilterArtistDto } from './dto/filter-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
@ApiTags('Artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
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
  @ApiNoContentResponse({ description: 'Artist deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
