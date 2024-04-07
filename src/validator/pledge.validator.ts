import { ValidatorPipe } from '@temboplus/common/dist/validation';
import * as Joi from 'joi';

export class CreatePledgeValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        contactId: Joi.string().required().label('Contact'),
        campaignId: Joi.string().required().label('Campaign'),
        amount: Joi.number().required().greater(0).label('Amount'),
        notes: Joi.string().allow(null).label('Notes'),
      }),
    );
  }
}

export class UpdatePledgeValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        // campaignId: Joi.string().optional().label('Campaign'),
        amount: Joi.number().optional().greater(0).label('Amount'),
        notes: Joi.string().allow(null).label('Notes'),
      })
        .min(1)
        .required(),
    );
  }
}
