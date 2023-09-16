import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { Car } from "src/cars/interfaces/cars.interface";
import { CreateCarDto, UpdateCarDto } from "./dto";

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
    return this.carsService.add(createCarDto);
  }

  @Patch(":id")
  updateCar(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(":id")
  removeCar(@Param("id", ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
