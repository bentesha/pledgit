import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ValidationException } from 'src/exceptions/validation.exception';
import { QueryHelper } from 'src/helpers/query.helper';
import { CampaignService } from 'src/services/campaign.service';
import { ContactService } from 'src/services/contact.service';
import {
  CreatePledgeInfo,
  PledgeService,
  UpdatePledgeInfo,
} from 'src/services/pledge.service';
import {
  CreatePledgeValidator,
  UpdatePledgeValidator,
} from 'src/validator/pledge.validator';

@Controller('pledge')
export class PledgeController {
  constructor(
    private readonly pledgeService: PledgeService,
    private readonly contactService: ContactService,
    private readonly campaignService: CampaignService,
    private readonly queryHelper: QueryHelper,
  ) {}

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const pledge = await this.pledgeService.findById(id);
    if (!pledge) {
      throw new NotFoundException();
    }
    return pledge;
  }

  @Get()
  async findAll(@Query() query: any) {
    query = this.queryHelper.setDefaults(query);
    return this.pledgeService.findAll(query);
  }

  @Post()
  async create(@Body(CreatePledgeValidator) input: any, requestId: string) {
    const info: CreatePledgeInfo = {
      contactId: input.contactId,
      campaignId: input.campaignId,
      amount: input.amount,
      notes: input.notes,
    };

    // Verify that contactId is valid
    const contact = await this.contactService.findById(info.contactId);
    if (!contact) {
      throw new ValidationException({
        contactId: `Contact with id '${info.contactId}' does not exist`,
      });
    }

    // Verify that campaignId is valid
    const campaign = await this.campaignService.findById(info.campaignId);
    if (!campaign) {
      throw new ValidationException({
        campaignId: `Campaign with id '${info.campaignId}' does not exist`,
      });
    }

    // A contact should not have more than one pledge in a campaign
    const exists = await this.pledgeService.findOne({
      contactId: info.contactId,
      campaignId: info.campaignId,
    });
    if (exists) {
      throw new ValidationException({
        contactId: 'Another pledge for this contact already exists',
      });
    }

    const pledge = await this.pledgeService.create(info, requestId);
    return pledge;
  }

  @Patch('/:id')
  async update(
    @Body(UpdatePledgeValidator) input: any,
    @Param('id') id: string,
    requestId: string,
  ) {
    const info: UpdatePledgeInfo = {
      amount: input.amount,
      notes: input.notes,
    };

    // if (info.campaignId) {
    //   // If campaign is being udpate, verify that campaingId is valid
    //   const campaign = await this.campaignService.findById(info.campaignId);
    //   if (!campaign) {
    //     throw new ValidationException({
    //       campaignId: `Campaign with id '${info.campaignId}' does not exist`,
    //     });
    //   }
    // }

    const pledge = await this.pledgeService.update(id, info, requestId);
    return pledge;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, requestId: string) {
    const pledge = await this.pledgeService.findById(id);
    if (!pledge) {
      throw new NotFoundException();
    }
    return this.pledgeService.delete(id, requestId);
  }
}
