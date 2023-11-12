import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities';
import { query } from 'express';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const user = await this.insertUsers();
    await this.insertNewProducts(user);
    return 'Seed executed';
  }

  private async deleteTables() {
    await this.productService.deleteAll();

    const queryBuilder = this.userRepository.createQueryBuilder();

    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const userSeed = initialData.users;

    const users: User[] = [];
    userSeed.forEach((user) => {
      users.push(this.userRepository.create(user));
    });
    await this.userRepository.save(users);
    return users[0];
  }

  private async insertNewProducts(user: User) {
    await this.productService.deleteAll();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product, user));
    });

    await Promise.allSettled(insertPromises);

    return true;
  }
}
