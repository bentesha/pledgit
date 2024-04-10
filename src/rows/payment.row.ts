export interface PaymentRow {
  id: string;
  contactId: string;
  pledgeId: string;
  campaignId: string;
  date: string | Date;
  amount: number;
  reference: string | null;
  method: string;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
