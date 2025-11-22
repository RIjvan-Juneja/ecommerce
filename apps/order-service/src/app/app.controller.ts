import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  async createOrder(data: { userId: string; productId: string; quantity: number }) {
    const { userId, productId, quantity } = data;

    // RPC call → user-service
    const user$ = this.userClient.send('get_user_by_id', userId);
    const user = await lastValueFrom(user$);

    // RPC call → product-service
    const product$ = this.productClient.send('get_product_by_id', productId);
    const product = await lastValueFrom(product$);

    const totalPrice = product.price * quantity;

    return {
      orderId: `ORD-${Date.now()}`,
      user,
      product,
      quantity,
      totalPrice,
    };
  }
}
