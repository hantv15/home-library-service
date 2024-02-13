// Nest dependencies
import { ApiProperty } from '@nestjs/swagger';

// Other dependencies
import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty()
  @IsString({ each: true })
  artists: string[];

  @ApiProperty()
  @IsString({ each: true })
  albums: string[];

  @ApiProperty()
  @IsString({ each: true })
  tracks: string[];
}
