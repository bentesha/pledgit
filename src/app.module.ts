import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { CommonModule } from '@temboplus/common';
import { CampaignService } from './services/campaign.service';
import { CampaignController } from './controllers/campaign.controller';
import { PledgeService } from './services/pledge.service';
import { PledgeController } from './controllers/pledge.controller';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { QueryHelper } from './helpers/query.helper';

@Module({
  imports: [CommonModule.config({})],
  controllers: [ContactController, CampaignController, PledgeController, PaymentController],
  providers: [ContactService, CampaignService, PledgeService, PaymentService, QueryHelper],
})
export class AppModule {}
