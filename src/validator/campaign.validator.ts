import { ValidatorPipe } from '@temboplus/common/dist/validation';
import * as Joi from 'joi';

export class CreateCampaignValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        name: Joi.string().required(),
        startDate: Joi.date().allow(null).required(),
        endDate: Joi.date().allow(null).required(),
        description: Joi.string().allow(null).optional(),
      }),
    );
  }
}

export class UpdateCampaignValidator extends ValidatorPipe {
  constructor() {
    super(
      Joi.object({
        name: Joi.string().optional(),
        startDate: Joi.date().allow(null).optional(),
        endDate: Joi.date().allow(null).optional(),
        description: Joi.string().allow(null).optional(),
      }),
    );
  }
}
