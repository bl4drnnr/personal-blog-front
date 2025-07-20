export interface SiteflowTile {
  title: string;
  description?: string;
  link: string;
  icon: string;
  iconAlt: string;
  image?: string;
  imageAlt?: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isPrimaryShadow?: boolean;
  tag?: string;
}
