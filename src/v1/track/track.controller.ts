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
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateTrackDto } from './dto/create-track.dto';
import { FilterTrackDto } from './dto/filter-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
@ApiTags('Tracks')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private sequelize: Sequelize,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiFoundResponse({
    description: 'Found record',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully all record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server',
  })
  findAll(@Query() filterTrackDto: FilterTrackDto) {
    return this.trackService.findAll(filterTrackDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Response record by ID',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error find track by ID',
  })
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Track updated password successfully',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Track deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  async remove(@Param('id') id: string) {
    const result = await this.sequelize.transaction(
      async (transaction: Transaction) => {
        return await this.trackService.remove(id, transaction);
      },
    );

    return result;
  }
}
