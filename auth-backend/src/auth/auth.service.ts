import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AppLogger } from 'src/common/logger';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: AppLogger,
  ) {}

  async signup(email: string, name: string, password: string) {
    this.logger.log(`Signing up user: ${email}`);

    const user = await this.userService.createUser(email, name, password);
    const token = this.jwtService.sign({ id: user._id, email: user.email });

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    };
  }

  async signin(email: string, password: string) {
    this.logger.log(`User trying to sign in: ${email}`);

    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.warn(`Failed login attempt for: ${email}`);

      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      this.logger.warn(`Failed password attempt for: ${email}`);

      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });
    this.logger.log(`User signed in: ${email}`);

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    };
  }
}
