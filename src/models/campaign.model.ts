import { Model, Pojo } from 'objection';
import { CampaignRow } from 'src/rows/campaign.row';

export class Campaign extends Model implements CampaignRow {
  id: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string | null;
  pledgedAmount?: number;
  paidAmount?: number;
  unpaidAmount?: number;
  createdAt: string | Date;
  updatedAt: string | Date;

  static tableName = 'campaign';

  $parseDatabaseJson(json: Pojo): Pojo {
    json = super.$parseDatabaseJson(json);
    if (json.pledgedAmount !== undefined) {
      json.pledgedAmount = Number(json.pledgedAmount);
      json.paidAmount = Number(json.paidAmount);
      json.unpaidAmount = Number(json.unpaidAmount);
    }
    return json;
  }
}
