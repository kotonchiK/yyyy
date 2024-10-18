import {
  Controller,
  Get,

} from '@nestjs/common';


@Controller()
export class Appcontroller {
  @Get()
  async findOne() {
    return 'hello';
  }
}
