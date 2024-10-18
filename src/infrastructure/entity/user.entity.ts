import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString, Length, Min, Max } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsString()
  @Length(1, 50)
  full_name: string;

  @Column({ length: 100 })
  @IsString()
  @Length(1, 50)
  role: string;

  @Column()
  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
