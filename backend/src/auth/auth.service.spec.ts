import { Test, TestingModule } from '@nestjs/testing';
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

  describe('register', () => {
    it('should register a user successfully', async () => {
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
  });

  describe('signIn', () => {
    it('should sign in successfully and return access token', async () => {
      // Arrange: Define mock data and mock function behavior
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
  });
});
