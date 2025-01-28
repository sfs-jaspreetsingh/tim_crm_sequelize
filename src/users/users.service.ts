import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Organization } from './entities/organization.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly jwtService: JwtService,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const updatedPass = await bcrypt.hash(createUserDto.password, 10);

    const checkOrganization = await this.organizationRepository.findOneBy({
      id: Number(createUserDto.organizationId),
    });

    if (!checkOrganization) {
      throw new NotFoundException('Organization does not exist')
    }

    let payload: any = {
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
      countryCode: createUserDto.countryCode,
      city: createUserDto.city,
      state: createUserDto.state,
      password: updatedPass,
      userRole: createUserDto.userRole,
      isActive: true,
      firstName: createUserDto.firstName || "",
      lastName: createUserDto.lastName || "",
      organizationId: createUserDto.organizationId,
      fullName: createUserDto.firstName + " " + createUserDto.lastName
    };
    const createUser = await this.userRepository.save(payload);
    if (!createUser) {
      throw new BadRequestException('User creation failed');
    }
    return createUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ firstName: username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async login(data: LoginUserDto) {
    //done
    const findEmailInDb = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (!findEmailInDb) {
      throw new BadRequestException('User does not exist');
    }
    //   const findUserPermissions = await this.userRepo.getPermissionsData(findEmailInDb._id.toString());
    const isPasswordValid = await bcrypt.compare(
      data.password,
      findEmailInDb.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Password does not match');
    }
    const token = this.jwtService.sign(
      { id: findEmailInDb.id },
      { secret: process.env.JWT_SECRET },
    );
    return {
      success: true,
      data: {
        token,
        userData: findEmailInDb,
      },
      message: 'Login Successfully',
    };
  }

  async addOrganization(data: any): Promise<any> {
    console.log('data', data);
    const addOrganization = await this.organizationRepository.save(data);
    if (!addOrganization) {
      throw new BadRequestException('Organization creation failed');
    }
    return addOrganization;
  }

  async getUserDetails(data: any) {
    console.log('data', data);
    // const getUserDetails =  await this.userRepository
    // .createQueryBuilder("user")
    // .leftJoinAndSelect("user.organization", "organization")
    // .getMany()

    const getUserDetails = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.organizationId', 'organizationId')
      .where({ id: data.userId });

    // const getUserDetails = await this.userRepository.find({
    //   where: { id: data.userId },
    //   relations: {
    //     organization: true,
    //   },
    // })
    const [users, totalcount] = await getUserDetails.getManyAndCount();

    if (!getUserDetails) {
      throw new BadRequestException('User details not found');
    }
    return { users, totalcount };
  }

  async deleteUser(userId: string, res: any): Promise<any> {
    // const deleteUser = await this.userRepository.delete({id: Number(userId)})

    const deleteUser = await this.userRepository
      .createQueryBuilder()
      .delete()
      .where({ id: Number(userId) })
      .execute();
    if (deleteUser.affected === 0) {
      throw new BadRequestException('User does not exist');
    }
    console.log('deleteUser', deleteUser);
    // return res.status(200).json({message:"sucess", statusCode:200})
    return {
      success: true,
      message: 'User deleted successfully',
      data: {},
    };

    // throw new HttpException({message:"sucess", statusCode:200},200)
  }

  async updateUser(data: any): Promise<any> {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      countryCode: data.countryCode,
      city: data.city,
      state: data.state,
      userRole: data.userRole,
      isActive: data.isActive,
    };
    // const updateUser = await this.userRepository.update({ id: data.userId }, payload)

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(payload)
      .where({ id: data.userId })
      .execute();

    const updatedUser = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    return updatedUser;
  }


  async deleteOrganization(data: any): Promise<any> {
    const deleteOrganization = await this.organizationRepository.createQueryBuilder()
      .delete()
      .where({ id: data.organizationId })
      .execute()

    if (deleteOrganization.affected === 0) {
      throw new BadRequestException('Organization does not exist');
    }
    return {
      success: true,
      message: 'Organization deleted successfully',
      data: {},
    };
  }

  async getAllUsers(data: any): Promise<any> {
    const { search, sort, page, limit } = data
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    const queryBuilder = this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.organizationId', 'organizationId')

    if (search) {
      queryBuilder.where("firstName LIKE :search OR lastName LIKE :search OR fullName LIKE :search OR organizationId.organizationName LIKE :search", { search: `%${search}%` })
    }

    const [users, totalcount] = await queryBuilder.getManyAndCount()
    console.log("users-- --", users, "totalCount-----", totalcount)

    return { users, totalcount }
  }

  async getAllOrganizations(data: any): Promise<any> {
    const { search, sort, page, limit } = data
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    const queryBuilder = this.organizationRepository.createQueryBuilder('organization')
      .leftJoinAndSelect("organization.users", "users")

    if (search) {
      queryBuilder.where("users.firstName LIKE :search OR users.lastName LIKE :search", { search: `%${search}%` })
    }
    queryBuilder.orderBy("organization.organizationName", "ASC")
    queryBuilder.skip(offset).take(limitNumber)

    return await queryBuilder.getMany()
  }



  

}
