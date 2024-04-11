import { Injectable, Query } from '@nestjs/common';
import { CryptoHelper, DateHelper } from '@temboplus/common/dist/helpers';
import { Pledge } from 'src/models/pledge.model';
import { PledgeRow } from 'src/rows/pledge.row';
import { findQuery } from 'objection-find';
import { DbHelper } from 'src/helpers/db.helper';
import { Model } from 'objection';
import { Payment } from 'src/models/payment.model';
import { CampaignService } from './campaign.service';

export interface CreatePledgeInfo {
  contactId: string;
  campaignId: string;
  amount: number;
  notes: string | string;
}

export interface UpdatePledgeInfo {
  amount?: number;
  notes?: string | string;
}

export interface FindPledgeInfo {
  number?: string;
  contactId?: string;
  campaignId?: string;
}

@Injectable()
export class PledgeService {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly dbHelper: DbHelper,
    private readonly dateHelper: DateHelper,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async findById(id: string): Promise<Pledge> {
    return Pledge.query().findById(id).withGraphFetched('[contact, campaign]');
  }

  async findOne(info: FindPledgeInfo): Promise<Pledge> {
    return Pledge.query().findOne(info);
  }

  async findAll(query: any): Promise<Array<Pledge>> {
    return findQuery(Pledge)
      .allowAll(true)
      .allowEager('[contact, campaign]')
      .build(query);
  }

  async create(info: CreatePledgeInfo, requestId): Promise<Pledge> {
    const row: PledgeRow = {
      id: this.cryptoHelper.generateId(),
      number: new Date().valueOf().toString(),
      contactId: info.contactId,
      campaignId: info.campaignId,
      amount: info.amount,
      notes: info.notes || null,
      createdAt: this.dateHelper.formatCurrentTime(),
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Pledge.query().insert(row);
    // Update campaign totals
    await this.campaignService.updateTotals(info.campaignId);
    return this.findById(row.id);
  }

  async update(id: string, info: UpdatePledgeInfo, requestId): Promise<Pledge> {
    const pledge = await this.findById(id);
    if (!pledge) {
      return undefined;
    }
    const updates: Partial<PledgeRow> = {
      // contactId: info.contactId,
      // campaignId: info.campaignId,
      amount: info.amount,
      notes: info.notes,
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Pledge.query().where({ id }).update(updates);
    // Update campaign totals
    await this.campaignService.updateTotals(pledge.campaignId);
    return this.findById(id);
  }

  async delete(id: string, requestId: string): Promise<Pledge> {
    const pledge = await this.findById(id);
    await Pledge.query().deleteById(id);
    return pledge;
  }

  async updateTotals(id: string) {
    const paidAmount = await this.dbHelper.getTotal(
      Payment.query().where({ pledgeId: id }),
      'amount',
    );
    await Pledge.query().where({ id }).update({ paidAmount });
  }
}
