import React from 'react';

export const generateLists = (
  items: any,
  locale: string,
  type?: string | undefined,
  style?: string | undefined
) => {

  const iterateList = (items: any) => (
    items.map((item: any, index: number) => {
      if (typeof item === 'string') {
        return (
          <li
            key={item}
        className={`blog-post-li ${locale === 'en' ? 'en' : 'non-en'}`}
        dangerouslySetInnerHTML={{ __html: item }}
        />
      );
      } else if (Array.isArray(item)) {
        return (
          <span
            key={index}
        className={`blog-post-li ${locale === 'en' ? 'en' : 'non-en'}`}
      >
        {generateLists(item, '', 'no-margin')}
        </span>
      );
      } else {
        return (
          <span
            key={index}
        className={`blog-post-li ${locale === 'en' ? 'en' : 'non-en'}`}
      >
        {generateLists(item.items, item.type, item.style)}
        </span>
      );
      }
    })
  );

  const CreatedList = ({
    items,
    type,
    style
  }: {
    items: any,
    type?: string | undefined,
    style?: string | undefined
  }) : JSX.Element => {
    if (type === 'list-bullet' || type === '') {
      return (
        <ul className={`blog-post-ul ${style || ''}`}>
      {iterateList(items)}
      </ul>
    );
    } else {
      return (
        <ol className={`blog-post-ol ${style || ''}`}>
      {iterateList(items)}
      </ol>
    );
    }
  };

  return <CreatedList items={items} type={type} style={style} />;
};
