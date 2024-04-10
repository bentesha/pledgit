import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QueryHelper } from 'src/helpers/query.helper';
import {
  CampaignService,
  CreateCampaignInfo,
  UpdateCampaignInfo,
} from 'src/services/campaign.service';
import {
  CreateCampaignValidator,
  UpdateCampaignValidator,
} from 'src/validator/campaign.validator';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly queryHelper: QueryHelper,
  ) {}

  @Get()
  async findAll(@Query() query: any) {
    query = this.queryHelper.setDefaults(query);
    return this.campaignService.findAll(query);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const campaign = await this.campaignService.findById(id);
    if (!campaign) {
      throw new NotFoundException();
    }
    return campaign;
  }

  @Post()
  async create(@Body(CreateCampaignValidator) input: any, requestId) {
    const info: CreateCampaignInfo = {
      name: input.name,
      startDate: input.startDate,
      endDate: input.endDate,
      description: input.description,
    };
    const campaign = await this.campaignService.create(info, requestId);
    return campaign;
  }

  @Patch('/:id')
  async update(
    @Body(UpdateCampaignValidator) input: any,
    @Param('id') id: string,
    requestId,
  ) {
    const exists = await this.findById(id);
    if (!exists) {
      throw new NotFoundException();
    }
    const info: UpdateCampaignInfo = {
      name: input.name,
      startDate: input.startDate,
      endDate: input.endDate,
      description: input.description,
    };
    const campaign = await this.campaignService.update(id, info, requestId);
    return campaign;
  }
}
