import { Model } from 'objection';
import { CampaignRow } from 'src/rows/campaign.row';

export class Campaign extends Model implements CampaignRow {
  id: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;

  static tableName = 'campaign';
}
