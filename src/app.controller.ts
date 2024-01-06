import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  @MessagePattern('topic-2')
  consumer(@Ctx() kafkaContext: KafkaContext) {
    console.log(kafkaContext.getMessage().value);
    console.log(kafkaContext.getPartition());
  }

  @Get()
  life() {
    return 'Server is running';
  }

  @Post('message')
  producer(@Body() data: { message: string }) {
    this.clientKafka.emit('topic-2', data.message);
    return true;
  }
}
