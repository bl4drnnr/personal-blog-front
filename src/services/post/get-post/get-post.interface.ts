interface ILink {
  name: string;
  link: string;
}

interface IPicture {
  type: 'picture';
  width: string;
  resource: string;
}

interface IList {
  type: 'list-numeric' | 'list-bullet';
  items: Array<any>;
  style: string;
}

interface ICode {
  type: 'code';
  lang: string;
  content: string;
}

interface ITitle {
  type: 'title' | 'subtitle' | 'subsubtitle';
  content: string;
}

export interface GetPostResponse {
  title: string;
  slug: string;
  tags: string;
  type: Array<string>;
  description: string;
  pageDescription: string;
  searchTags: Array<string>;
  intro: string;
  timestamp: string;
  footer?: string;
  toc: object;
  content: Array<string | IPicture | IList | ICode | ITitle>;
  references: Array<ILink>;
}
