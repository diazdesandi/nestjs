import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Car } from "src/cars/interfaces/cars.interface";
import { v4 as uuid } from "uuid";
import { CreateCarDto, UpdateCarDto } from "./dto";

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: "Toyota",
      model: "Corolla",
    },
    {
      id: uuid(),
      brand: "Honda",
      model: "Civic",
    },
    {
      id: uuid(),
      brand: "Jeep",
      model: "Cherokee",
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    // return this.cars[id - 1];
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  add(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    // Si id existe y es diferente
    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(`ID ${updateCarDto.id} invalid`);
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
