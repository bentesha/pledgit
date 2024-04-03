import { Model } from 'objection';
import { ContactRow } from 'src/rows/contact.row';

export class Contact extends Model implements ContactRow {
  id: string;
  reference: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string | Date;
  updatedAt: string | Date;

  static tableName = 'contact';
}
