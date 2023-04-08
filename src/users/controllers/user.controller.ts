import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/users/entities/user';
import { UsersService } from 'src/users/services/user.sevice';
import { handleNotFoundUser } from '../helpers/handleNotFoundUser';
import { EventsGateway } from '../events/events.gateway';
import { UserDto } from '../dto/user-dto';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService, private readonly gateway: EventsGateway) {}

  @ApiResponse({
    status: 200,
    isArray: true,
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(UserDto),
      },
    },
  })
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<User | NotFoundException> {
    const isUserFound = await this.userService.findOne(id);
    !isUserFound && handleNotFoundUser(id);
    return isUserFound;
  }

  @ApiResponse({
    status: 201,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  @Post()
  create(@Body() user: UserDto): Promise<UserDto> {
    this.gateway.server.emit('userCreated', user);
    return this.userService.create(user);
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UserDto): Promise<UserDto | NotFoundException> {
    const isUserFound = await this.userService.update(id, user);
    !isUserFound && handleNotFoundUser(id);
    return isUserFound;
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully deleted user with id 10',
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string } | NotFoundException> {
    const isUserFound = await this.userService.remove(id);
    return isUserFound.affected ? { message: `Successfully deleted user with id ${id}` } : handleNotFoundUser(id);
  }
}
