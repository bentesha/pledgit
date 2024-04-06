import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  async findAll() {
    return this.campaignService.findAll();
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
