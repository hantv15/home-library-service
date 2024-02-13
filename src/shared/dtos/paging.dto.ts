import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PagingDto {
  @ApiPropertyOptional({ description: 'Page pick' })
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ description: 'Limit only elements in page' })
  @IsOptional()
  limit: number;
}
