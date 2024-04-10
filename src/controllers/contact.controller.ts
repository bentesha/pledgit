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
import { ValidationException } from 'src/exceptions/validation.exception';
import { QueryHelper } from 'src/helpers/query.helper';
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
  constructor(
    private readonly contactService: ContactService,
    private readonly queryHelper: QueryHelper,
  ) {}

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.contactService.findById(id);
  }

  @Get()
  async findAll(@Query() query: any) {
    this.queryHelper.setDefaults(query);
    return this.contactService.findAll(query);
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

    // Phone number must be unique
    const phoneExists = await this.contactService.findOne({
      phone: info.phone,
    });
    if (phoneExists) {
      throw new ValidationException({
        phone: 'Another contact with this phone exists',
      });
    }

    if (info.reference) {
      // Reference must be unique
      const referenceExists = await this.contactService.findOne({
        reference: info.reference,
      });
      if (referenceExists) {
        throw new ValidationException({
          reference: 'Another contact with this reference exists',
        });
      }
    }

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

    if (info.phone) {
      // Phone number must be unique
      const contact = await this.contactService.findOne({
        phone: info.phone,
      });
      if (contact && contact.id !== id) {
        throw new ValidationException({
          phone: 'Another contact with this phone exists',
        });
      }
    }

    if (info.reference) {
      // Reference must be unique
      const contact = await this.contactService.findOne({
        reference: info.reference,
      });
      if (contact && contact.id !== id) {
        throw new ValidationException({
          reference: 'Another contact with this reference exists',
        });
      }
    }

    const contact = await this.contactService.update(id, info, requestId);
    return contact;
  }
}
