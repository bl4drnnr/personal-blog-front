import React from 'react';

import classNames from 'classnames';

import { InputProps } from '@components/BasicInput/BasicInput.interface';
import { Container, InputField, Placeholder } from '@styles/BasicInput.style';

const BasicInput = ({
  value,
  locale,
  onChange,
  disabled,
  placeholder,
  innerPlaceholder
}: InputProps) => {
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

  return (
    <Container>
      {(placeholder.length) > 0 && <Placeholder>{placeholder}</Placeholder>}
      <InputField
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`${classNames({ disabled })} ${getLocale(locale)}`}
        placeholder={innerPlaceholder?.length ? innerPlaceholder : ''}
      />
    </Container>
  );
};

export default BasicInput;
