import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'Seed executed';
  }

  private async insertNewProducts() {
    await this.productService.deleteAll();

    const products = initialData.products;

    const insertPromises = [];

    // products.forEach((product) => {
    //   insertPromises.push(this.productService.create(product));
    // });

    await Promise.allSettled(insertPromises);

    return true;
  }
}
