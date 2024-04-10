import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryHelper {
  setDefaults(query: any) {
    if (!query.rangeStart) {
      query.rangeStart = 0;
    }

    if (!query.rangeEnd) {
      query.rangeEnd = 50;
    }
    return query;
  }
}
