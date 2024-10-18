import { IsInt, IsString, Length, Max, Min, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @ValidateIf((o) => o.full_name !== undefined)
  @IsString()
  @Length(1, 255)
  full_name?: string;

  @ValidateIf((o) => o.role !== undefined)
  @IsString()
  @Length(1, 100)
  role?: string;

  @ValidateIf((o) => o.efficiency !== undefined)
  @IsInt()
  @Min(0)
  @Max(100)
  efficiency?: number;
}
