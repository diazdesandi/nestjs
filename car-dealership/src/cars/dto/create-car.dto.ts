import { IsString } from "class-validator";

// DTO: Data Transfer Object
// IsString valida que el DTO venga con los campos requeridos:
// Ej: model !== modeL
export class CreateCarDto {
  /*
  Mensaje personalizado
  IsString({message: ''})
  */

  @IsString()
  readonly brand: string;

  @IsString()
  readonly model: string;
}
