// Nest dependencies
import { ApiProperty } from '@nestjs/swagger';

// Other dependencies
import { IsNotEmpty, IsString, Matches } from 'class-validator';

// Local files
import { IsNotWhiteSpace } from '../../../shared/decorators/class-validators/is-trim.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @Matches(/^[^\w_]+$/)
  @ApiProperty({
    example: 'name login',
  })
  login: string;

  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @ApiProperty({
    example: 'password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @ApiProperty({
    example: 'password',
  })
  verifyPassword: string;
}
