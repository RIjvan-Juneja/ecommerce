import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy
  ) {}

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product$ = this.productClient.send('get_product_by_id', id);
    return lastValueFrom(product$);
  }
}
