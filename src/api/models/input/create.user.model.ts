import { IsString, IsInt, Length, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  full_name: string;

  @IsString()
  @Length(1, 50)
  role: string;

  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
