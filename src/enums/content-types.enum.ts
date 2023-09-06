export enum ContentTypesEnum {
  LINK = 'link',
  PICTURE = 'picture',
  LIST_NUMERIC = 'list-numeric',
  LIST_BULLET = 'list-bullet',
  CODE = 'code',
  PARAGRAPH = 'paragraph',
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  SUBSUBTITLE = 'subsubtitle'
}

export type TitlesType = ContentTypesEnum.TITLE | ContentTypesEnum.SUBTITLE | ContentTypesEnum.SUBSUBTITLE;

export type ListsType = ContentTypesEnum.LIST_BULLET | ContentTypesEnum.LIST_NUMERIC;
