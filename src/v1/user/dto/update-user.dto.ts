import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotWhiteSpace } from '../../../shared/decorators/class-validators/is-trim.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @ApiProperty({
    example: 'oldPassword',
  })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsNotWhiteSpace()
  @ApiProperty({
    example: 'newPassword',
  })
  newPassword: string;
}
