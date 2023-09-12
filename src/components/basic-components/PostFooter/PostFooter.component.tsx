import React from 'react';

import dayjs from 'dayjs';
import Image from 'next/image';

import { PostFooterProps } from '@components/PostFooter/PostFooter.interface';
import { Container, Message, HrefLink, TimestampWrapper } from '@styles/PostFooter.style';

const PostFooter = ({ message, timestamp, locale }: PostFooterProps) => {
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
    <Container className={getLocale(locale)}>
      {message && (<Message className={'mess'}>{message}</Message>)}
      <Message className={'link'}>
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/github.svg`}
          className={'img'}
          alt={'GitHub'}
          width={24}
          height={24}
        />
        <HrefLink href="https://github.com/bl4drnnr">github.com/bl4drnnr</HrefLink>
      </Message>
      <Message className={'link'}>
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/linkedin.svg`}
          className={'img'}
          alt={'GitHub'}
          width={24}
          height={24}
        />
        <HrefLink href="https://linkedin.com/in/mikhail-bahdashych">linkedin.com/mikhail-bahdashych</HrefLink>
      </Message>
      <Message className={'link'}>
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/gmail.svg`}
          className={'img'}
          alt={'GitHub'}
          width={24}
          height={24}
        />
        <HrefLink href="mailto:contact@mikhailbahdashych.me">contact@mikhailbahdashych.me</HrefLink>
      </Message>
      <TimestampWrapper>
        {timestamp && (<Message className={'timestamp'}>{timestamp}</Message>)}
      </TimestampWrapper>
    </Container>
  );
};

export default PostFooter;
