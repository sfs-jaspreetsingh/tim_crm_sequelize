import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Organization } from './entities/organization.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategies/jwt.strategies';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Organization]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService, JwtStrategy],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
