import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  BadRequestException,
  UseGuards,
  Req,
  Query,
  InternalServerErrorException,
  Res,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { Message } from 'src/common/decorators/message.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @Message("User created successfully")
  @Public()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  @Public() //done
  async login(@Body() data: LoginUserDto): Promise<any> {
    try {
      console.log('1');
      return await this.usersService.login(data);
      // if (result.success) {
      //   return this.responseService.successResponseWithData(res, result.data, result.message);
      // } else {
      //   return this.responseService.errorResponse(res, result.message);
      // }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('addOrganization')
  async addOrganization(@Body() data: any, @Req() req: Request): Promise<any> {
    try {
      console.log('req.user', req.user);
      return await this.usersService.addOrganization(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('getUserDetails')
  async getUserDetails(@Req() req: Request, @Query() data: any): Promise<any> {
    try {
      return await this.usersService.getUserDetails(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('deleteUser')
  async deleteUser(
    @Req() req: Request,
    @Query('userId') userId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this.usersService.deleteUser(userId, res);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('updateUser')
  async updateUser(@Body() data: any): Promise<any> {
    try {
      return await this.usersService.updateUser(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Delete("deleteOrganization")
  async deleteOrganization(@Req() req: Request,@Res() res: Response, @Query() data: any){
    try {
      const result = await this.usersService.deleteOrganization(data);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get("getAllUsers")
  async getAllUsers(@Req() req: Request, @Query() data: any){
    try {
      return await this.usersService.getAllUsers(data)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }


  @Get("getAllOrganizations")
  async getAllOrganizations(@Query() data: any):Promise<any>{
    try {
      return await this.usersService.getAllOrganizations(data)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
