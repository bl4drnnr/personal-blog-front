export interface Certificate {
  id: string;
  name: string;
  issuedDate: string;
  expirationDate: string | null; // null for certificates that don't expire
  logo: string;
  description: string;
}
