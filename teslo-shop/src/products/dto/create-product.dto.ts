import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product price',
    nullable: false,
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product slug -- SEO',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product stock',
    default: 0,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Product sizes',
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product gender',
  })
  @IsIn(['men', 'woman', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product tags',
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Product images',
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
