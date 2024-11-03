import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }


  async register(createUserDto: CreateUserDto) {
    try {
      const respose = await this.userService.create(createUserDto)
      return respose
    } catch (error) {
      throw error;
    }
  }
  async signIn(loginDto: LoginDto): Promise<{ access_token: string, username: string }> {
    let user = await this.userService.findByUsername(loginDto.username);
    if (!user) {
      const createUser = await this.register({ username: loginDto.username })
      user = createUser
    }

    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username
    };
  }
}
