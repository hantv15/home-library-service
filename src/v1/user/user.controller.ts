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
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiFoundResponse({
    description: 'Found record',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully all record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server',
  })
  findAll(@Query() filterUserDto: FilterUserDto) {
    return this.userService.findAll(filterUserDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Response record by id',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'User updated password successfully',
  })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  @ApiForbiddenResponse({
    description: 'Not match old password',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @ApiBadRequestResponse({
    description: 'ID is not uuid format',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
