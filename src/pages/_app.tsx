import '@styles/globals.scss';
import React from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { RecoilRoot } from 'recoil';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Head>
        <meta name={'viewport'} content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default appWithTranslation(App);
