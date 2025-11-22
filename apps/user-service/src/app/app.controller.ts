import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('get_user_by_id')
  getUserById(userId: string) {
    return {
      id: userId,
      name: 'Test User',
      email: 'test@micro.com',
    };
  }
}
