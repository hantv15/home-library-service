// Nest dependencies
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

// Other dependencies
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

// Local files
import { PagingDto } from '../../../shared/dtos/paging.dto';

export class FilterAlbumDto extends PartialType(PagingDto) {
  @ApiPropertyOptional({ description: 'Search for album name' })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ description: 'Search for release year' })
  @IsOptional()
  year: number;

  @ApiPropertyOptional({ description: 'Search for artist ID' })
  @IsOptional()
  artistId: string;

  @ApiPropertyOptional({ description: 'Order by with property in record' })
  @IsOptional()
  orderBy: string;

  @ApiPropertyOptional({ enum: ['desc', 'asc'], description: 'Default desc' })
  @IsOptional()
  order: string;

  @ApiPropertyOptional({ description: 'Start date' })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  from: Date;

  @ApiPropertyOptional({ description: 'End date' })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  to: Date;
}
