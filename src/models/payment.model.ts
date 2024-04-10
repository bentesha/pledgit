import { Model } from 'objection';
import { PaymentRow } from 'src/rows/payment.row';
import { Contact } from './contact.model';
import { Campaign } from './campaign.model';
import { Pledge } from './pledge.model';

export class Payment extends Model implements PaymentRow {
  id: string;
  contactId: string;
  pledgeId: string;
  campaignId: string;
  date: string | Date;
  amount: number;
  reference: string | null;
  method: string;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;

  static tableName = 'payment';

  static relationMappings = {
    contact: {
      relation: Model.BelongsToOneRelation,
      modelClass: Contact,
      join: {
        from: 'payment.contactId',
        to: 'contact.id',
      },
    },

    campaign: {
      relation: Model.BelongsToOneRelation,
      modelClass: Campaign,
      join: {
        from: 'payment.campaignId',
        to: 'campaign.id',
      },
    },

    pledge: {
      relation: Model.BelongsToOneRelation,
      modelClass: Pledge,
      join: {
        from: 'payment.pledgeId',
        to: 'pledge.id',
      },
    },
  };
}
