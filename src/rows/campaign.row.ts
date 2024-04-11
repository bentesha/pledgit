export interface CampaignRow {
  id: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string | null;
  pledgedAmount?: number;
  paidAmount?: number;
  unpaidAmount?: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
