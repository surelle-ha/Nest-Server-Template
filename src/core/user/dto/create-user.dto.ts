import { IsString, IsEmail, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsEnum(['male', 'female', 'other']) gender: string;
    @IsDateString() birthday: string;
    @IsString() address1: string;
    @IsOptional() @IsString() address2?: string;
    @IsString() city: string;
    @IsString() country: string;
    @IsEmail() email: string;
    @IsString() password: string;
}
