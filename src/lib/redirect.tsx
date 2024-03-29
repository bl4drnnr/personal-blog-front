import React from 'react';

import { useRouter } from 'next/router';

import languageDetector from './languageDetector';

const useRedirect = (to?: any) => {
  const router = useRouter();
  to = to || router.asPath;

  React.useEffect(() => {
    const detectedLng = languageDetector.detect();
    if (to.startsWith('/' + detectedLng) && router.route === '/404') {
      router.replace('/' + detectedLng + router.route);
      return;
    }

    // @ts-ignore
    languageDetector.cache(detectedLng);
    router.replace('/' + detectedLng + to);
  });

  return <></>;
};

export const Redirect = () => {
  useRedirect();
  return <></>;
};
