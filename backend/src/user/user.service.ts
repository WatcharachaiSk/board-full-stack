import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
