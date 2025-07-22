export interface Project {
  slug: string;
  title: string;
  description?: string;
  content?: string;
  date: string;
  tags?: string[];
  featuredImage?: string;
  technologies?: string[];
  githubUrl?: string;
  demoUrl?: string;
  // Legacy properties for backward compatibility
  type?: string; // Project type/category
  aiModel?: string; // AI model used
  client?: string; // Client name
  imageUrl?: string; // Maps to featuredImage
  altText?: string; // Alt text for image
}
