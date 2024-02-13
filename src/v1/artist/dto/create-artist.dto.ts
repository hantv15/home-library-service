// Nest dependencies
import { ApiProperty } from '@nestjs/swagger';

// Other dependencies
import { IsNotEmpty, IsString } from 'class-validator';

// Local files
import { IsNotWhiteSpace } from '../../../shared/decorators/class-validators/is-trim.decorator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @ApiProperty({
    example: 'username',
    description: 'Artist Name',
  })
  name: string;

  @ApiProperty({ example: false })
  grammy: boolean;
}
