import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventPattern } from '@nestjs/microservices';

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

  @EventPattern('order.created')
  handleOrderCreated(data: {
    orderId: string;
    productId: string;
    quantity: number;
  }) {
    
    console.log('📦 Order created event received:', data);

    // TODO: reduce stock in TypeORM later
  }
}
