import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const createUser = this.userRepository.create({
        username: createUserDto.username,
      })
      const saveUser = await this.userRepository.save(createUser)
      return saveUser
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY' || error?.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username
        }
      })
      return user
    } catch (error) {
      throw error
    }
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id
        }
      })
      
      if (_.isEmpty(user)) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user
    } catch (error) {
      throw error
    }
  }

}
