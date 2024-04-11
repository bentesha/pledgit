export interface PledgeRow {
  id: string;
  number: string;
  contactId: string;
  campaignId: string;
  amount: number;
  paidAmount?: number;
  unpaidAmount?: number;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
