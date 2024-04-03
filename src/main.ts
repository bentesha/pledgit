import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Knex from 'knex';
import { Model } from 'objection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const knex = Knex({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      database: 'pledgit',
      user: 'root',
      password: 'password',
    },
  });
  Model.knex(knex);

  await app.listen(3055);
}
bootstrap();
