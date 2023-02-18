import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import {
  BlogPostDescription,
  BlogPostPreview,
  BlogPostsContainer, BlogPostTitle,
  Container, InterestingPosts,
  IntroTextBox,
  IntroTextWrapper,
  TypewritingText
} from '@styles/home.style';

interface PostProps {
  title: string;
  description: string;
  link: string;
}

interface HomeProps {
  locale: string;
}

const Home = ({ locale }: HomeProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  const [bestPosts,] = React.useState<PostProps[]>([{
    title: t('articles:nextjs-nginx-deployment.title'),
    description: t('articles:nextjs-nginx-deployment.pageDescription'),
    link: '/blog/nextjs-nginx-deployment'
  }, {
    title: t('articles:how-does-dns-work-and-why-we-need-dnssec.title'),
    description: t('articles:how-does-dns-work-and-why-we-need-dnssec.pageDescription'),
    link: '/blog/how-does-dns-work-and-why-we-need-dnssec'
  }]);

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:home.title')}</title>
        <meta name={'keywords'} content={'mikhail bahdashych,mikhail,bahdashych,blog,cybersecurity,portfolio'} />
        <meta name={'description'} content={'Hello there! My name is Mikhail Bahdashych and this is my personal blog - place where I share my thoughts and knowledge. Hope you will find something interesting.'} />
      </Head>
      <DefaultLayout locale={locale} translation={t}>
        <Container>
          <IntroTextBox>

            <IntroTextWrapper>
              <TypewritingText>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .changeDelay(75)
                      .typeString(t('pages:home.name'))
                      .start();
                  }}
                />
              </TypewritingText>

              <TypewritingText className={classNames('small')}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(1250)
                      .changeDelay(35)
                      .typeString(t('pages:home.workTitles'))
                      .start();
                  }}
                />
              </TypewritingText>

              <TypewritingText className={classNames('smaller')}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(2750)
                      .changeDelay(25)
                      .typeString(t('pages:home.interests'))
                      .start();
                  }}
                />
              </TypewritingText>
            </IntroTextWrapper>

          </IntroTextBox>

          <BlogPostsContainer>
            <InterestingPosts>
              {t('pages:home.interestingPosts')} <Image
                className={'icon'}
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/fire.png`}
                alt={'Fire'}
                width={32}
                height={32}
              />
            </InterestingPosts>

            {bestPosts.map((post, key) => (
              <BlogPostPreview
                key={key}
                onClick={() => handleRedirect(post.link)}
              >
                <BlogPostTitle>{post.title}</BlogPostTitle>
                <BlogPostDescription>{post.description}</BlogPostDescription>
              </BlogPostPreview>
            ))}
          </BlogPostsContainer>
        </Container>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps(['pages', 'components', 'common', 'articles', 'projects']);
export { getStaticPaths, getStaticProps };

export default Home;
