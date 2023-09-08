export interface IFetchPosts {
  page: number;
  pageSize: number;
  order: string;
  locale: string;
  orderBy: string;
  searchQuery?: string;
  postTypes?: Array<string>;
}
