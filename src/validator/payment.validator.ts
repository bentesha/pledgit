import { ValidatorPipe } from '@temboplus/common/dist/validation';
import * as Joi from 'joi';
import { PaymentMethod } from 'src/types/payment.method.type';

export class CreatePaymentValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        pledgeId: Joi.string().required().label('Pledge'),
        date: Joi.date().required().label('Date'),
        amount: Joi.number().required().label('Amount'),
        reference: Joi.string().allow(null).label('Reference'),
        method: Joi.string()
          .required()
          .valid(
            PaymentMethod.Mobile,
            PaymentMethod.Bank,
            PaymentMethod.Card,
            PaymentMethod.Cash,
            PaymentMethod.Other,
          )
          .label('Method'),
        notes: Joi.string().allow(null).label('Notes'),
      }),
    );
  }
}

export class UpdatePaymentValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        date: Joi.date().label('Date'),
        amount: Joi.number().label('Amount'),
        reference: Joi.string().allow(null).label('Reference'),
        method: Joi.string()
          .valid(
            PaymentMethod.Cash,
            PaymentMethod.Bank,
            PaymentMethod.Mobile,
            PaymentMethod.Card,
            PaymentMethod.Other,
          )
          .label('Method'),
        notes: Joi.string().allow(null).label('Notes'),
      })
        .required()
        .min(1),
    );
  }
}
