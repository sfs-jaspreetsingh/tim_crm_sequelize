import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('1233124');
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(user.password === pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('user', user);
    const payload = { username: user.firstName, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
