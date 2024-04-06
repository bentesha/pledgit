export interface CampaignRow {
  id: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
