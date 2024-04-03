export interface ContactRow {
  id: string;
  reference: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
