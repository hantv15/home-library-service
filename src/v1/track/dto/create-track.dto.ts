// Nest dependencies
import { ApiProperty } from '@nestjs/swagger';

// Other dependencies
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

// Local file
import { IsNotWhiteSpace } from '../../../shared/decorators/class-validators/is-trim.decorator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @ApiProperty({
    example: 'Name album',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'ID artist',
  })
  artistId: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'ID album',
  })
  albumId: string | null;

  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 1,
  })
  duration: number;
}
