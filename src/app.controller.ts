import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Starter Route")
@Controller()
export class AppController 
{

  @Get()
  getHello(): string {
    return 'Api is working!';
  }
}
