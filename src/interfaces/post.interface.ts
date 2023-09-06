import { ICode, ILink, IList, IParagraph, IPicture, ITitle } from '@interfaces/common-elems.interface';

export interface IPost {
  title: string;
  slug: string;
  tags: string;
  type: Array<string>;
  description: string;
  pageDescription: string;
  searchTags: Array<string>;
  intro: string;
  footer?: string;
  toc: object;
  content: Array<IParagraph | IPicture | IList | ICode | ITitle>;
  references: Array<ILink>;
  createdAt: string;
  updatedAt: string;
}
