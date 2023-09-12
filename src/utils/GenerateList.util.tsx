import React from 'react';

export const generateLists = (
  items: any,
  locale: string,
  type?: string | undefined,
  style?: string | undefined
) => {
  const getLocale = (currentLocale: string) => {
    switch (currentLocale) {
      case 'en':
        return 'en';
      case 'ru':
        return 'non-en';
      case 'pl':
        return 'non-en';
      default:
        return 'en';
    }
  };

  const iterateList = (items: any) => (
    items.map((item: any, index: number) => {
      if (typeof item === 'string') {
        return (
          <li
            key={item}
        className={`blog-post-li ${getLocale(locale)}`}
        dangerouslySetInnerHTML={{ __html: item }}
        />
      );
      } else if (Array.isArray(item)) {
        return (
          <span
            key={index}
        className={`blog-post-li ${getLocale(locale)}`}
      >
        {generateLists(item, '', 'no-margin')}
        </span>
      );
      } else {
        return (
          <span
            key={index}
        className={`blog-post-li ${getLocale(locale)}`}
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
