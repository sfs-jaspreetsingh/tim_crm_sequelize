import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './common/guards/role.guard';
import { HttpResponseInterceptor } from './common/interceptors/http-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/database.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/strategies/jwt.strategies';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
@Module({
  imports: [
    UsersModule,
    CatsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1h' }, // Token expiration time
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    ConfigModule,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // configServiceProvider
    // connectionFactory
  ],
  // exports: ["CONNECTION"]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
