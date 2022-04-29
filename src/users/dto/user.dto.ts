import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;

  @IsString()
  @IsEmail()
  readonly email: string;
}
