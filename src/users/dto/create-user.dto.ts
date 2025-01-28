import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsLowercase,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  userRole: string;

  @IsNotEmpty()
  @IsString()
  organizationId: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
