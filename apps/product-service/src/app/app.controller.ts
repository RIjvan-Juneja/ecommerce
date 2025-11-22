import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('get_product_by_id')
  getProductById(productId: string) {
    return {
      id: productId,
      name: 'Test Product',
      price: 100,
      stock: 20,
    };
  }
}