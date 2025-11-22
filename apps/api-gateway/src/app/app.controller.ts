import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

   @Get(':id')
  async getUser(@Param('id') id: string) {
    // send returns an Observable — convert to Promise with lastValueFrom
    const user$ = this.userClient.send('get_user_by_id', id);
    const user = await lastValueFrom(user$);
    return user;
  }
}
