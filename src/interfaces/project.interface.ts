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

export interface IProject {
  title: string;
  slug: string;
  brief: string;
  tags: string;
  description: string;
  projectTags: Array<string>;
  briefDescription: string;
  license: string;
  techStack: Array<ITechStack>;
  projectPages: Array<IProjectPage>;
  toc: object;
  content: Array<string | IPicture | IList | ICode | ITitle>;
}
