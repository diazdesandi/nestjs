import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBrandDto, UpdateBrandDto } from "./dto";
import { Brand } from "./entities/brand.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: "Toyota",
      createdAt: new Date().getTime(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: new Date().getTime(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) throw new NotFoundException(`Brand with id "${id} not found"`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map((car) => {
      if (car.id === id) {
        brandDB = {
          ...brandDB,
          ...updateBrandDto,
          id,
        };
        return brandDB;
      }
      return car;
    });

    return brandDB;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }
}
