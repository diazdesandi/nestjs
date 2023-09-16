import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from 'src/interfaces/cars.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): Car[] {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): Car {
    return this.carsService.findOneById(id);
  }

  @Post()
  addCar(@Body() body: Car) {
    return body;
  }

  @Put(':id')
  updateCar(@Body() body: Car) {
    return body;
  }
  @Delete(':id')
  removeCar(@Param('id', ParseIntPipe) id: number) {
    return {
      msg: 'Delete',
      id,
    };
  }
}
