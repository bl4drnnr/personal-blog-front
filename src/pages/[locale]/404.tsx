import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import {
  Container, MainMessage, RedirectMessage, SecondaryMessage,
  Wrapper
} from '@styles/error.style';

interface ErrorPageProps {
  locale: string;
}

const ErrorPage = ({ locale }: ErrorPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:error.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translation={t}>
        <Container>
          <Wrapper>
            <MainMessage>{t('pages:error.mainMessage')}</MainMessage>
            <SecondaryMessage>{t('pages:error.secondMessage')}</SecondaryMessage>
            <RedirectMessage
              onClick={() => handleRedirect('/')}
            >
              {t('pages:error.redirectMessage')}
            </RedirectMessage>
          </Wrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default ErrorPage;
