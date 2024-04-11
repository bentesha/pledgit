import { Injectable } from '@nestjs/common';
import { CryptoHelper, DateHelper } from '@temboplus/common/dist/helpers';
import { Campaign } from 'src/models/campaign.model';
import { CampaignRow } from 'src/rows/campaign.row';
import { findQuery } from 'objection-find';
import { DbHelper } from 'src/helpers/db.helper';
import { Pledge } from 'src/models/pledge.model';
import { Payment } from 'src/models/payment.model';

export interface CreateCampaignInfo {
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string | null;
}

export interface UpdateCampaignInfo {
  name?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  description?: string | null;
}

@Injectable()
export class CampaignService {
  constructor(
    private readonly dbHelper: DbHelper,
    private readonly dateHelper: DateHelper,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async findById(id: string): Promise<Campaign> {
    return Campaign.query().findById(id);
  }

  async findAll(query: any): Promise<Array<Campaign>> {
    return findQuery(Campaign).allowAll(true).allowEager('').build(query);
  }

  async create(info: CreateCampaignInfo, requestId): Promise<Campaign> {
    const row: CampaignRow = {
      id: this.cryptoHelper.generateId(),
      name: info.name,
      startDate: info.startDate,
      endDate: info.endDate,
      description: info.description,
      createdAt: this.dateHelper.formatCurrentTime(),
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Campaign.query().insert(row);
    return this.findById(row.id);
  }

  async update(
    id: string,
    info: UpdateCampaignInfo,
    requestId: string,
  ): Promise<Campaign> {
    const updates: Partial<CampaignRow> = {
      name: info.name,
      startDate: info.startDate,
      endDate: info.endDate,
      description: info.description,
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Campaign.query().where({ id }).update(updates);
    return this.findById(id);
  }

  async updateTotals(id: string) {
    // Calculate total pledges
    const pledgedAmount = await this.dbHelper.getTotal(
      Pledge.query().where({ campaignId: id }),
      'amount',
    );
    // Calculate total payments
    const paidAmount = await this.dbHelper.getTotal(
      Payment.query().where({ campaignId: id }),
      'amount',
    );
    await Campaign.query().where({ id }).update({
      pledgedAmount,
      paidAmount,
    });
  }
}
