import { Model, Pojo } from 'objection';
import { PledgeRow } from 'src/rows/pledge.row';
import { Contact } from './contact.model';
import { Campaign } from './campaign.model';

export class Pledge extends Model implements PledgeRow {
  id: string;
  number: string;
  contactId: string;
  campaignId: string;
  amount: number;
  notes: string | string;
  createdAt: string | Date;
  updatedAt: string | Date;

  static tableName = 'pledge';

  static relationMappings = {
    contact: {
      relation: Model.BelongsToOneRelation,
      modelClass: Contact,
      join: {
        from: 'pledge.contactId',
        to: 'contact.id',
      },
    },

    campaign: {
      relation: Model.BelongsToOneRelation,
      modelClass: Campaign,
      join: {
        from: 'pledge.campaignId',
        to: 'campaign.id',
      },
    },
  };

  $parseDatabaseJson(json: Pojo): Pojo {
    json = super.$parseDatabaseJson(json);
    if (json.amount !== undefined) {
      json.amount = Number(json.amount);
    }
    return json;
  }
}
