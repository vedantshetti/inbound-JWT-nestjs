import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ved', // Ensure this matches the secret key in auth.service.ts
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new Error('Unauthorized'); // Add error handling
    }
    return user; // Returning the validated user for further use
  }
}
