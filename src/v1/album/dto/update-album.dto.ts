// Nest dependencies
import { PartialType } from '@nestjs/swagger';

// Local file
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
