import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number = 0;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const Pokemon = await this.pokemonModel.create(createPokemonDto);
      return Pokemon;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.pokemonModel.find().limit(limit).skip(offset).sort({
      no: 1, // Ordenar de forma ascendente
    });
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // Si es un número
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // Si es MongoID
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Si es nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Can't find ${term}`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      const updatedPokemon = await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });

      return { ...pokemon.toJSON(), ...updatedPokemon };
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      // const result = this.pokemonModel.findByIdAndDelete(id);
      const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

      if (deletedCount === 0) {
        throw new BadRequestException(`Pokemon ${id} not found.`);
      }

      return;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  private errorHandler(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Error ${error.code}: ${JSON.stringify(error.keyValue)} already exists`,
      );
    }
    console.log(error);

    throw new InternalServerErrorException(
      `Can't create Pokemon -- check server logs`,
    );
  }
}
