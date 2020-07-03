import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ApplicationModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['ignite-dds-kafka-server1:9092'],
        // brokers: ['localhost:29092'],
      },
    },
  });
  // tslint:disable-next-line:no-console
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
