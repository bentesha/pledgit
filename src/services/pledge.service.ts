import { Injectable } from '@nestjs/common';
import { CryptoHelper, DateHelper } from '@temboplus/common/dist/helpers';
import { Pledge } from 'src/models/pledge.model';
import { PledgeRow } from 'src/rows/pledge.row';
import { findQuery } from 'objection-find';

export interface CreatePledgeInfo {
  contactId: string;
  campaignId: string;
  amount: number;
  notes: string | string;
}

export interface UpdatePledgeInfo {
  contactId?: string;
  campaignId?: string;
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
    return this.findById(row.id);
  }

  async update(id: string, info: UpdatePledgeInfo, requestId): Promise<Pledge> {
    const updates: Partial<PledgeRow> = {
      contactId: info.contactId,
      campaignId: info.campaignId,
      amount: info.amount,
      notes: info.notes,
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Pledge.query().where({ id }).update(updates);
    return this.findById(id);
  }

  async delete(id: string, requestId: string): Promise<Pledge> {
    const pledge = await this.findById(id);
    await Pledge.query().deleteById(id);
    return pledge;
  }
}
