import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user';
import { EventsModule } from './users/events/events.module';
import { UsersModule } from './users/modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: 'root',
      password: process.env.PASSWORD,
      database: 'nestjs',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User],
      retryAttempts: 2,
    }),
    UsersModule,
    EventsModule,
  ],
})
export class AppModule {}
