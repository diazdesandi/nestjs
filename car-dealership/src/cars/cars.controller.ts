import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { Car } from "src/cars/interfaces/cars.interface";
import { CreateCarDto } from "./dto/create-car.dto";

// Controlador escucha la lógica y regresa una respuesta.

@Controller("cars")
// Se aplica el Pipe a todos los métodos.
// @UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): Car[] {
    return this.carsService.findAll();
  }

  @Get(":id")
  getCarById(
    // Cambiar versión de UUID para el pipe.
    // new ParseUUIDPipe({ version: "4" })
    @Param("id", ParseUUIDPipe) id: string
  ): Car {
    return this.carsService.findOneById(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)
  addCar(@Body() createCarDto: CreateCarDto) {
  addCar(@Body() body: Car) {
    return body;
  }

  @Put(":id")
  updateCar(@Body() body: Car) {
    return body;
  }
  @Delete(":id")
  removeCar(@Param("id", ParseUUIDPipe) id: string) {
    return {
      msg: "Delete",
      id,
    };
  }
}
