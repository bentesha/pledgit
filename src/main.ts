import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Knex from 'knex';
import { Model } from 'objection';
import { config } from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  config()

  const knex = Knex({
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
  });
  Model.knex(knex);

  await app.listen(process.env.PORT);
}
bootstrap();
