export interface PledgeRow {
  id: string;
  number: string;
  contactId: string;
  campaignId: string;
  amount: number;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
