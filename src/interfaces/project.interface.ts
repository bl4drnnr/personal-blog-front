import { ICode, IList, IParagraph, IPicture, IProjectPage, ITechStack, ITitle } from '@interfaces/common-elems.interface';

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
  content: Array<IParagraph | IPicture | IList | ICode | ITitle>;
}
