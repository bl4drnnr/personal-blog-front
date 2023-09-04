import React from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Typewriter from 'typewriter-effect';

import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import {
  BlogPostDescription,
  BlogPostPreview,
  BlogPostsContainer,
  BlogPostTimestamp,
  BlogPostTitle,
  Container,
  InterestingPosts,
  IntroTextBox,
  IntroTextWrapper,
  TypewritingText,
  PostTag,
  PostTagsWrapper
} from '@styles/home.style';

interface PostProps {
  title: string;
  description: string;
  link: string;
  timestamp: string;
  searchTags: string[];
}

interface HomeProps {
  locale: string;
}

const Home = ({ locale }: HomeProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [interestingPosts, setInterestingPosts] = React.useState<PostProps[]>([]);
  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
  //   // @ts-ignore
  //   const allInterestingPosts = process.env.NEXT_PUBLIC_INTERESTING_POSTS.split(',');
  //   const posts: PostProps[] = [];
  //
  //   allInterestingPosts.forEach((post) => {
  //     posts.push({
  //       title: t(`${post}:title`),
  //       description: t(`${post}:pageDescription`),
  //       link: `/blog/${post}`,
  //       timestamp: t(`${post}:timestamp`),
  //       searchTags: t(`${post}:searchTags`, { returnObjects: true })
  //     });
  //   });
  //
  //   setInterestingPosts(posts);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 250);
    });
  }, []);

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

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

          <BlogPostsContainer className={locale === 'en' ? 'en' : 'non-en'}>
            <InterestingPosts>
              {t('pages:home.interestingPosts')} <Image
                className={'icon'}
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/fire.png`}
                alt={'Fire'}
                width={32}
                height={32}
              />
            </InterestingPosts>


            {interestingPosts.map((post, key) => (
              <BlogPostPreview
                key={key}
                onClick={() => handleRedirect(post.link)}
              >
                <BlogPostTitle>{post.title}</BlogPostTitle>
                <BlogPostDescription>{post.description}</BlogPostDescription>
                <BlogPostTimestamp>{post.timestamp}</BlogPostTimestamp>
                <PostTagsWrapper>
                  {post.searchTags.map((item, index) => (
                    <PostTag key={index}>{item}</PostTag>
                  ))}
                </PostTagsWrapper>
              </BlogPostPreview>
            ))}
          </BlogPostsContainer>
        </Container>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default Home;
