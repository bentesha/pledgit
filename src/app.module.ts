import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { CommonModule } from '@temboplus/common';
import { CampaignService } from './services/campaign.service';
import { CampaignController } from './controllers/campaign.controller';

@Module({
  imports: [CommonModule.config({})],
  controllers: [ContactController, CampaignController],
  providers: [ContactService, CampaignService],
})
export class AppModule {}
