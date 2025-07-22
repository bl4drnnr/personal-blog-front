export interface Post {
  slug: string;
  title: string;
  description: string;
  content?: string;
  publishDate?: string;
  updatedDate?: string;
  tags?: string[];
  featuredImage?: string;
  author?: string;
  excerpt?: string;
  // Legacy properties for backward compatibility
  date?: string; // Maps to publishDate
  category?: string; // Maps to first tag or category
  imageUrl?: string; // Maps to featuredImage
  altText?: string; // Alt text for image
}
