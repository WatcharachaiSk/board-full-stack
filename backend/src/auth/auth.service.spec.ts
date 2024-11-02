import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a user successfully', async () => {
    // This test case verifies that the auth service can successfully register a user.
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

    jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

    const result = await service.register(createUserDto);
    expect(result).toEqual(createdUser);
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should sign in successfully and return access token', async () => {
    // This test case verifies that the auth service can sign in a user and return an access token.
    const loginDto: LoginDto = {
      username: 'testuser',
    };
    const user: UserEntity = {
      id: 1,
      username: loginDto.username,
      posts: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const token = 'mocked-access-token';

    jest.spyOn(userService, 'findByUsername').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

    const result = await service.signIn(loginDto);
    expect(result).toEqual({
      access_token: token,
      username: user.username,
    });
    expect(userService.findByUsername).toHaveBeenCalledWith(loginDto.username);
    expect(jwtService.signAsync).toHaveBeenCalledWith({ id: user.id, username: user.username });
  });

  it('should throw an exception if user not found during sign in', async () => {
    // This test case ensures that an exception is thrown if the user is not found during sign in.
    const loginDto: LoginDto = {
      username: 'unknownuser',
    };

    jest.spyOn(userService, 'findByUsername').mockResolvedValue(undefined);

    await expect(service.signIn(loginDto)).rejects.toThrow(new HttpException('User not found', HttpStatus.NOT_FOUND));
    expect(userService.findByUsername).toHaveBeenCalledWith(loginDto.username);
  });
});
