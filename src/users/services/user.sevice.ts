import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from '../dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> | null {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async create(user: UserDto): Promise<UserDto> {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: UserDto): Promise<UserDto | null> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }
}
