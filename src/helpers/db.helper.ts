import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'knex';
import { Model } from 'objection';

@Injectable()
export class DbHelper {
  async getTotal(builder: any, column: string): Promise<number> {
    const result = await builder.sum({ total: column }).first();
    const total = Number(result.total);
    return total;
  }
}
