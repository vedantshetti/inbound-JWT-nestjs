import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email); // Ensure findByEmail is defined in UserService
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id };
      return {
        accessToken: this.jwtService.sign(payload, { secret: 'ved' }), // Ensure the secret matches
      };
    }
    throw new Error('Invalid credentials');
  }
}
