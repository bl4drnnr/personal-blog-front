interface ITechStack {
  src: string;
  width: number;
  height: number;
}

interface IProjectPage {
  link: string;
  text: string;
}

interface IPicture {
  type: 'picture';
  width: string;
  resource: string;
}

interface IList {
  type: 'list-numeric' | 'list-bullet';
  items: Array<any>;
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

export interface GetProjectResponse {
  title: string;
  slug: string;
  brief: string;
  description: string;
  searchTags: Array<string>;
  briefDescription: string;
  license: string;
  techStack: Array<ITechStack>;
  projectPages: Array<IProjectPage>;
  toc: object;
  content: Array<string | IPicture | IList | ICode | ITitle>;
}
