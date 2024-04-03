import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { CommonModule } from '@temboplus/common';

@Module({
  imports: [CommonModule.config({})],
  controllers: [ContactController],
  providers: [ContactService],
})
export class AppModule {}
