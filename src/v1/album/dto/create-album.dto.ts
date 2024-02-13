// Nest dependencies
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Other dependencies
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

// Local files
import { IsNotWhiteSpace } from '../../../shared/decorators/class-validators/is-trim.decorator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @ApiProperty({
    example: 'name album',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'year of album public, year >= 1000 or year <= 9999',
  })
  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(9999)
  year: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'ID artist of album',
  })
  artistId: string | null;
}
