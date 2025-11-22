import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly selfClient: ClientProxy // 👈 NEW
  ) {}

  @MessagePattern('create_order')
  async createOrder(data: {
    userId: string;
    productId: string;
    quantity: number;
  }) {
    const { userId, productId, quantity } = data;

    const user$ = this.userClient.send('get_user_by_id', userId);
    const user = await lastValueFrom(user$);

    const product$ = this.productClient.send('get_product_by_id', productId);
    const product = await lastValueFrom(product$);

    const totalPrice = product.price * quantity;

    const result = {
      orderId: `ORD-${Date.now()}`,
      user,
      product,
      quantity,
      totalPrice,
    };

    // Emit event for asynchronous processing
    this.selfClient.emit('order.created', {
      orderId: result.orderId,
      productId: product.id,
      quantity,
    });

    return result;
  }
}
