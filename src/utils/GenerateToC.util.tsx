import React from 'react';

export const generateTableOfContents = (toc: any, level = 0) => {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CreateTableOfContents = ({ toc }: { toc: any }): JSX.Element => {
    const keys = Object.keys(toc);
    return (
      <ol className={'table-of-contents-ol'} style={{ paddingLeft: `${level * 20}px` }}>
      {keys.map((key, index) => {
        const keyToScroll = key.toLowerCase().replace(/\s+/g, '-');
        return (
          <li key={index} className={'table-of-contents-li'}>
            {typeof toc[key] === 'string' ? (
              <a href={`#${keyToScroll}`} onClick={() => scrollToId(keyToScroll)}>
                {toc[key]}
              </a>
            ) : (
              <>
                <a href={`#${keyToScroll}`} onClick={() => scrollToId(keyToScroll)}>
                  {key}
                </a>
                {generateTableOfContents(toc[key], level + 1)}
              </>
            )}
          </li>
        );
      })}
      </ol>
    );
  };

  return <CreateTableOfContents toc={toc} />;
};

