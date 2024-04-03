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
  ContactService,
  CreateContactInfo,
  UpdateContactInfo,
} from 'src/services/contact.service';
import {
  CreateContactValidator,
  UpdateContactValidator,
} from 'src/validator/contact.validator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.contactService.findById(id);
  }

  @Get()
  async findAll() {
    return this.contactService.findAll();
  }

  @Post()
  async create(@Body(CreateContactValidator) input: any) {
    const requestId = null;
    const info: CreateContactInfo = {
      reference: input.reference,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
    };
    const contact = await this.contactService.create(info, requestId);
    return contact;
  }

  @Patch('/:id')
  async update(
    @Body(UpdateContactValidator) input: any,
    @Param('id') id: string,
  ) {
    const requestId = null;
    const exits = await this.contactService.findById(id);
    if (!exits) {
      throw new NotFoundException();
    }

    const info: UpdateContactInfo = {
      reference: input.reference,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
    };
    const contact = await this.contactService.update(id, info, requestId);
    return contact;
  }
}
