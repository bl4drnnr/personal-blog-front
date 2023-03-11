import React from 'react';

export const generateTableOfContents = (toc: any, parentKeyName?: string) => {
  const scrollTo = (ref: any) => {
    if (ref && ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const CreateTableOfContents = ({ toc, parentKeyName }: { toc: any, parentKeyName?: string }): JSX.Element => {
    return (
      <ol className={'table-of-contents-ol'}>
        {Object.entries(toc).map(([key, value]: any) => {
          const keyName = parentKeyName ? parentKeyName + '.' + key : key;
          if (typeof value === 'string') {
            return (
              <li
                className={'table-of-contents-li'}
                key={key}
                onClick={() => scrollTo(keyName)}
              >
                {toc[keyName]}
              </li>
            );
          } else {
            return (
              <li
                className={'table-of-contents-li'}
                key={key}
              >
                <span onClick={() => scrollTo(keyName)}>{key}</span>
                {generateTableOfContents(value, keyName)}
              </li>
            );
          }
        })}
      </ol>
    );
  };

  return <CreateTableOfContents toc={toc} parentKeyName={parentKeyName} />;
};
