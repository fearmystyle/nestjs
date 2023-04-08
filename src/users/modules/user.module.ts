import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/users/controllers/user.controller';
import { User } from 'src/users/entities/user';
import { UsersService } from 'src/users/services/user.sevice';
import { EventsGateway } from '../events/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, EventsGateway],
  controllers: [UsersController],
})
export class UsersModule {}
