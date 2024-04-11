import { Injectable } from '@nestjs/common';
import { CryptoHelper, DateHelper } from '@temboplus/common/dist/helpers';
import { Payment } from 'src/models/payment.model';
import { PaymentRow } from 'src/rows/payment.row';
import { PledgeService } from './pledge.service';
import { findQuery } from 'objection-find';
import { CampaignService } from './campaign.service';

export interface CreatePaymentInfo {
  pledgeId: string;
  date: string | Date;
  amount: number;
  reference: string | null;
  method: string;
  notes: string | null;
}

export interface UpdatePaymentInfo {
  date?: string | Date;
  amount?: number;
  reference?: string | null;
  method?: string;
  notes?: string | null;
}

export interface FindPaymentInfo {
  reference?: string;
}

@Injectable()
export class PaymentService {
  constructor(
    private readonly pledgeService: PledgeService,
    private readonly campaignService: CampaignService,
    private readonly dateHelper: DateHelper,
    private readonly peldgeService: PledgeService,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async findById(id: string): Promise<Payment> {
    return Payment.query()
      .findById(id)
      .withGraphFetched('[contact, pledge, campaign]');
  }

  async findOne(info: FindPaymentInfo): Promise<Payment> {
    return Payment.query().findOne(info);
  }

  async findAll(query: any): Promise<Array<Payment>> {
    return findQuery(Payment)
      .allowAll(true)
      .allowEager('[contact, pledge, campaign]')
      .build(query);
  }

  async create(info: CreatePaymentInfo, requestId: string): Promise<Payment> {
    const pledge = await this.peldgeService.findById(info.pledgeId);
    const row: PaymentRow = {
      id: this.cryptoHelper.generateId(),
      pledgeId: info.pledgeId,
      contactId: pledge.contactId,
      campaignId: pledge.campaignId,
      date: info.date,
      amount: info.amount,
      method: info.method,
      reference: info.reference,
      notes: info.notes,
      createdAt: this.dateHelper.formatCurrentTime(),
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Payment.query().insert(row);
    // Calculate pledge totals
    await this.pledgeService.updateTotals(info.pledgeId);
    return this.findById(row.id);
  }

  async update(
    id: string,
    info: UpdatePaymentInfo,
    requestId: string,
  ): Promise<Payment> {
    const payment = await this.findById(id);
    if (!payment) {
      return undefined;
    }
    const updates: Partial<PaymentRow> = {
      date: info.date,
      amount: info.amount,
      reference: info.reference,
      method: info.method,
      notes: info.notes,
    };
    await Payment.query().where({ id }).update(updates);
    // Update pledge & campaign totals
    await this.pledgeService.updateTotals(payment.pledgeId);
    await this.campaignService.updateTotals(payment.campaignId);
    return this.findById(id);
  }

  async delete(id: string, requestId: string): Promise<Payment> {
    const payment = await this.findById(id);
    if (!payment) {
      return undefined;
    }
    await Payment.query().deleteById(id);
    // Update pledge & campaign totals
    await this.pledgeService.updateTotals(payment.pledgeId);
    await this.campaignService.updateTotals(payment.campaignId);
    return payment;
  }
}
