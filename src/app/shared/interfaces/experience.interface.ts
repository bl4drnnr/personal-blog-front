export interface Position {
  title: string;
  startDate: string;
  endDate: string | null; // null for current position
  description: string;
}

export interface Experience {
  id: string;
  companyName: string;
  companyLogo: string;
  companyWebsite: string;
  positions: Position[];
}
