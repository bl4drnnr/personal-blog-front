export interface MenuTile {
  id?: string;
  title: string;
  link: string;
  icon: string;
  iconAlt: string;
  image: string;
  imageAlt: string;
  sortOrder?: number;

  // Optional existing properties for backward compatibility
  description?: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isPrimaryShadow?: boolean;
  tag?: string;
}
