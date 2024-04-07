import { Injectable } from '@nestjs/common';
import { DateHelper, CryptoHelper } from '@temboplus/common/dist/helpers';
import { Contact } from 'src/models/contact.model';
import { ContactRow } from 'src/rows/contact.row';

export interface CreateContactInfo {
  reference: string | null;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UpdateContactInfo {
  reference?: string | null;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface FindContactInfo {
  phone?: string;
  reference?: string;
}

@Injectable()
export class ContactService {
  constructor(
    private readonly dateHelper: DateHelper,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async findById(id: string): Promise<Contact> {
    return Contact.query().findById(id);
  }

  async findOne(info: FindContactInfo): Promise<Contact> {
    return Contact.query().findOne(info);
  }

  async findAll(): Promise<Array<Contact>> {
    return Contact.query();
  }

  async create(info: CreateContactInfo, requestId: string): Promise<Contact> {
    // TODO: Ensure that reference and phone are unique
    const row: ContactRow = {
      id: this.cryptoHelper.generateId(),
      reference: info.reference || null,
      firstName: info.firstName,
      lastName: info.lastName,
      phone: info.phone,
      createdAt: this.dateHelper.formatCurrentTime(),
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Contact.query().insert(row);
    return this.findById(row.id);
  }

  async update(
    id: string,
    info: UpdateContactInfo,
    requestId: string,
  ): Promise<Contact> {
    // TODO: If provided, ensure that reference and phone are unique
    const updates: Partial<ContactRow> = {
      reference: info.reference,
      firstName: info.firstName,
      lastName: info.lastName,
      phone: info.phone,
      updatedAt: this.dateHelper.formatCurrentTime(),
    };
    await Contact.query().where({ id }).update(updates);
    return this.findById(id);
  }
}
