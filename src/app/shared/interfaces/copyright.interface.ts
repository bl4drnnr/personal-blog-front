export interface CopyrightLink {
  title: string;
  link: string;
}

export interface Copyright {
  copyrightLinks: Array<CopyrightLink>;
  copyrightEmail: string;
  copyrightText: string;
}
