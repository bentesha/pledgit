import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(details: { [key: string]: string }) {
    super({
      statusCode: 400,
      message: 'Validation failed',
      error: 'Validation Error',
      details,
    });
  }
}
