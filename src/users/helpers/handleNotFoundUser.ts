import { HttpException, HttpStatus } from '@nestjs/common';

export const handleNotFoundUser = (id: number) => {
  throw new HttpException(`User with id ${id} not Found`, HttpStatus.NOT_FOUND);
};
