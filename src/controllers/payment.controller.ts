import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ValidationException } from 'src/exceptions/validation.exception';
import { QueryHelper } from 'src/helpers/query.helper';
import {
  CreatePaymentInfo,
  PaymentService,
  UpdatePaymentInfo,
} from 'src/services/payment.service';
import { PledgeService } from 'src/services/pledge.service';
import {
  CreatePaymentValidator,
  UpdatePaymentValidator,
} from 'src/validator/payment.validator';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly pledgeService: PledgeService,
    private readonly queryHelper: QueryHelper,
  ) {}

  @Get()
  async findAll(@Query() query: any) {
    query = this.queryHelper.setDefaults(query)
    return this.paymentService.findAll(query);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const payment = await this.paymentService.findById(id);
    if (!payment) {
      throw new NotFoundException();
    }
    return payment;
  }

  @Post()
  async create(@Body(CreatePaymentValidator) input: any, requestId: string) {
    const info: CreatePaymentInfo = {
      pledgeId: input.pledgeId,
      date: input.date,
      amount: input.amount,
      reference: input.reference,
      method: input.method,
      notes: input.notes,
    };

    // Ensure that pledgeId is a valid
    const pledge = await this.pledgeService.findById(info.pledgeId);
    if (!pledge) {
      throw new ValidationException({
        pledgeId: 'A pledge with this id does not exist',
      });
    }

    const payment = await this.paymentService.create(info, requestId);
    return payment;
  }

  @Patch('/:id')
  async update(
    @Body(UpdatePaymentValidator) input,
    @Param('id') id: string,
    requestId,
  ) {
    const info: UpdatePaymentInfo = {
      date: input.date,
      amount: input.amount,
      reference: input.reference,
      method: input.method,
      notes: input.notes,
    };
    const payment = await this.paymentService.update(id, info, requestId);
    return payment;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, requestId: string) {
    const payment = await this.paymentService.findById(id);
    if (!payment) {
      throw new NotFoundException();
    }
    return this.paymentService.delete(id, requestId);
  }
}
