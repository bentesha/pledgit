import { ValidatorPipe } from '@temboplus/common/dist/validation';
import * as Joi from 'joi';

export class CreateContactValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        reference: Joi.string().valid(null).label('Reference'),
        firstName: Joi.string().required().label('First name'),
        lastName: Joi.string().required().label('Last name'),
        phone: Joi.string().required().label('Phone'),
      }),
    );
  }
}

export class UpdateContactValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        reference: Joi.string().allow(null).label('Reference'),
        firstName: Joi.string().label('First name'),
        lastName: Joi.string().label('Last name'),
        phone: Joi.string().label('Phone'),
      })
        .min(1)
        .message('Payload cannot be an empty object')
        .required(),
    );
  }
}
