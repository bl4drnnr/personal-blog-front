import { ContentTypesEnum } from '@enums/content-types.enum';
import { ICode, IList, IParagraph, IPicture, ITitle } from '@interfaces/common-elems.interface';

type CommonType = IParagraph | IPicture | IList | ICode | ITitle;

export const isItemParagraph = (item: CommonType): item is IParagraph => {
  return item.type === ContentTypesEnum.PARAGRAPH;
};

export const isItemCode = (item: CommonType): item is ICode => {
  return item.type === ContentTypesEnum.CODE;
};

export const isItemPicture = (item: CommonType): item is IPicture => {
  return item.type === ContentTypesEnum.PICTURE;
};

export const isItemTitle = (item: CommonType): item is ITitle => {
  return [ContentTypesEnum.TITLE, ContentTypesEnum.SUBTITLE, ContentTypesEnum.SUBSUBTITLE].includes(item.type);
};

export const isItemList = (item: CommonType): item is IList => {
  return [ContentTypesEnum.LIST_NUMERIC, ContentTypesEnum.LIST_BULLET].includes(item.type);
};

export const getImageLink = (item: IPicture, slug: string): string => {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${slug}/${item.resource}`;
};
