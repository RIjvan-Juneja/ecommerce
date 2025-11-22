import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy
  ) {}

  @Post()
  async create(
    @Body() dto: { userId: string; productId: string; quantity: number }
  ) {
    const order$ = this.orderClient.send('create_order', dto);
    return lastValueFrom(order$);
  }
}
