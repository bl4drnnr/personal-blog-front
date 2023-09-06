import { ContentTypesEnum, ListsType, TitlesType } from '@enums/content-types.enum';

export interface ILink {
  type: ContentTypesEnum.LINK
  name: string;
  link: string;
}

export interface IPicture {
  type: ContentTypesEnum.PICTURE;
  width: string;
  resource: string;
}

export interface IList {
  type: ListsType;
  items: Array<any>;
  style: string;
}

export interface ICode {
  type: ContentTypesEnum.CODE;
  lang: string;
  content: string;
}

export interface ITitle {
  type: TitlesType;
  content: string;
}

export interface IParagraph {
  type: ContentTypesEnum.PARAGRAPH,
  content: string;
}

export interface ITechStack {
  src: string;
  width: number;
  height: number;
}

export interface IProjectPage {
  link: string;
  text: string;
}
