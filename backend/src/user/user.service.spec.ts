import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should create a user successfully', async () => {
    // This test case verifies that the service can successfully create a user.
    const createUserDto: CreateUserDto = {
      username: 'testuser',
    };
    const createdUser: UserEntity = {
      id: 1,
      username: createUserDto.username,
      posts: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual(createdUser);
    expect(userRepository.create).toHaveBeenCalledWith({ username: createUserDto.username });
    expect(userRepository.save).toHaveBeenCalledWith(createdUser);
  });

  it('should throw a conflict exception if username already exists', async () => {
    // This test case ensures that a conflict exception is thrown if the username already exists.
    const createUserDto: CreateUserDto = {
      username: 'testuser',
    };

    const createdUser: UserEntity = {
      id: 1,
      username: createUserDto.username,
      posts: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
    jest.spyOn(userRepository, 'save').mockRejectedValue({ code: '23505' });

    await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
  });

  it('should find a user by username successfully', async () => {
    // This test case verifies that the service can retrieve a user by their username.
    const username = 'testuser';
    const user: UserEntity = {
      id: 1,
      username: username,
      posts: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    const result = await service.findByUsername(username);
    expect(result).toEqual(user);
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { username: username } });
  });

  it('should return undefined if user by username not found', async () => {
    // This test case ensures that undefined is returned if the user by username is not found.
    const username = 'unknownuser';

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const result = await service.findByUsername(username);
    expect(result).toBeUndefined();
  });

  it('should find a user by id successfully', async () => {
    // This test case verifies that the service can retrieve a user by their id.
    const userId = 1;
    const user: UserEntity = {
      id: userId,
      username: 'testuser',
      posts: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    const result = await service.findOneById(userId);
    expect(result).toEqual(user);
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
  });

  it('should throw an exception if user by id not found', async () => {
    // This test case ensures that an exception is thrown if the user by id is not found.
    const userId = 1;

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOneById(userId)).rejects.toThrow(new HttpException('User not found', HttpStatus.NOT_FOUND));
  });
});

