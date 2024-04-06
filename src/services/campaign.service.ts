import { Injectable } from '@nestjs/common';
import { CryptoHelper, DateHelper } from '@temboplus/common/dist/helpers';
import { Campaign } from 'src/models/campaign.model';
import { CampaignRow } from 'src/rows/campaign.row';

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
    private readonly dateHelper: DateHelper,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async findById(id: string): Promise<Campaign> {
    return Campaign.query().findById(id);
  }

  async findAll(): Promise<Array<Campaign>> {
    return Campaign.query();
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
}
