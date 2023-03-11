import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nextConfig from '@i18config';


export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lang) => ({
    params: {
      locale: lang
    }
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
});

export async function getI18nProps(
  ctx: any,
  ns = [
    'pages',
    'components',
    'errors',
    'common',
    'projects'
  ]) {
  const locale = await ctx?.params?.locale || 'en';

  return { ...(await serverSideTranslations(locale, ns)), locale };
}


export function makeStaticProps(ns?: string[]) {
  return async function getStaticProps(ctx: any) {
    return {
      props: await getI18nProps(ctx, ns)
    };
  };
}
