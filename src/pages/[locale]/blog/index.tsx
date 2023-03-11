import React from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

import BasicButton from '@components/BasicButton/BasicButton.component';
import BasicInput from '@components/BasicInput/BasicInput.component';
import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import {
  AllPostsWrapper,
  BlogIntroWrapper,
  BlogPostsDescription,
  BlogPostsTitle,
  ButtonWrapper,
  FoundPostWrapper,
  InputWrapper,
  PostDescription,
  PostTag,
  PostTags,
  PostTimestamp,
  PostTitle,
  SettingsWrapper,
  TestimonialArticle,
  TestimonialGrid
} from '@styles/blog.style';


interface BlogProps {
  locale: string;
}

interface PostProps {
  title: string;
  description: string;
  link: string;
  timestamp: string;
  searchTags: string[];
  postType: string[];
  show: boolean;
}

const Blog = ({ locale }: BlogProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [searchString, setSearchString] = React.useState('');
  const [dateSort, setDateSort] = React.useState('');
  const [nameSort, setNameSort] = React.useState('');
  const [postTypeSort, setPostTypeSort] = React.useState<Array<string>>([]);

  const [foundPosts, setFoundPosts] = React.useState<PostProps[]>([]);
  const [allPosts, setAllPosts] = React.useState<PostProps[]>([]);

  React.useEffect(() => {
    // @ts-ignore
    const allAvailablePosts = process.env.NEXT_PUBLIC_AVAILABLE_POSTS.split(',');
    const posts: PostProps[] = [];

    allAvailablePosts.forEach((post) => {
      posts.push({
        title: t(`${post}:title`),
        description: t(`${post}:pageDescription`),
        link: `/blog/${post}`,
        timestamp: t(`${post}:timestamp`),
        searchTags: t(`${post}:searchTags`, { returnObjects: true }),
        postType: t(`${post}:type`, { returnObjects: true }),
        show: true
      });
    });

    setAllPosts(posts);
  }, []);

  React.useEffect(() => {
    const foundSearchPosts: PostProps[] = [];

    allPosts.forEach((post) => {
      if (
        (searchString && post.title.toLowerCase().includes(searchString.toLowerCase())) ||
        (searchString && post.searchTags.join(',').includes(searchString.toLowerCase()))
      ) {
        foundSearchPosts.push(post);
      }
    });

    setFoundPosts(foundSearchPosts);
  }, [searchString]);

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  const sortByDate = (date: string) => {
    const currentPosts = allPosts;

    if (date !== '' && date === 'ASC') {
      setDateSort('DESC');
      currentPosts.sort((a, b) => dayjs(b.timestamp).diff(a.timestamp));
    }
    else {
      setDateSort('ASC');
      currentPosts.sort((a, b) => dayjs(a.timestamp).diff(b.timestamp));
    }

    setAllPosts(currentPosts);
  };

  const sortByName = (sortType: string) => {
    const currentPosts = allPosts;

    if (sortType !== '' && sortType === 'A -> Z') {
      setNameSort('Z -> A');
      currentPosts.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      setNameSort('A -> Z');
      currentPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    setAllPosts(currentPosts);
  };

  const sortByType = (sortType: string) => {
    const t = [...postTypeSort];

    if (t.includes(sortType)) t.splice(t.indexOf(sortType), 1);
    else t.push(sortType);

    setPostTypeSort(t);

    const localTheory = t.includes('theory');
    const localPractice = t.includes('practice');

    const sortedPosts: PostProps[] = allPosts.map((post) => {
      const hasPractice = post.postType.includes('practice');
      const hasTheory = post.postType.includes('theory');
      const showPost = (localPractice && hasPractice) || (localTheory && hasTheory);

      if (t.length === 0) {
        return { ...post, show: true };
      } else {
        if (localTheory && localPractice) return { ...post, show: hasPractice && hasTheory };
        else if (showPost) return { ...post, show: true };
        else return { ...post, show: false };
      }
    });

    setAllPosts(sortedPosts);
  };

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:blog.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translation={t}>

        <BlogIntroWrapper>
          <BlogPostsTitle>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(75)
                  .typeString(t('pages:blog.alexandriaLibrary'))
                  .start();
              }}
            />
          </BlogPostsTitle>

          <BlogPostsDescription className={'margins'}>
            {t('pages:blog.description')}
          </BlogPostsDescription>

        </BlogIntroWrapper>

        <AllPostsWrapper className={locale === 'en' ? 'en' : 'non-en'}>
          <InputWrapper>
            <BasicInput
              locale={locale}
              value={searchString}
              placeholder={t('common:searchPosts')}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <SettingsWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={dateSort !== '' ? dateSort : 'ASC/DESC'}
                  onClick={() => sortByDate(dateSort)}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={nameSort !== '' ? nameSort : 'A-Z'}
                  onClick={() => sortByName(nameSort)}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/practice.png`}
                      alt={'icon'}
                      width={22}
                      height={22}
                    />
                  }
                  active={postTypeSort.includes('practice')}
                  onClick={() => sortByType('practice')}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/theory.png`}
                      alt={'icon'}
                      width={22}
                      height={22}
                    />
                  }
                  active={postTypeSort.includes('theory')}
                  onClick={() => sortByType('theory')}
                />
              </ButtonWrapper>
            </SettingsWrapper>
          </InputWrapper>

          {foundPosts.length > 0 ? (
            foundPosts.map((post, key) => (
              <BlogIntroWrapper
                key={key}
                className={'found-posts'}
                onClick={() => handleRedirect(post.link)}
              >
                <FoundPostWrapper>
                  <PostTitle>{post.title}</PostTitle>
                  <PostTimestamp>{post.timestamp}</PostTimestamp>
                  <PostDescription>{post.description}</PostDescription>
                  <PostTags>
                    {/*{post.searchTags.map((item, index) => (*/}
                    {/*  <PostTag key={index}>{item}</PostTag>*/}
                    {/*))}*/}
                    {/*{post.postType.map((typeItem, index) => (*/}
                    {/*  <Image*/}
                    {/*    key={index}*/}
                    {/*    className={'icon'}*/}
                    {/*    src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/${typeItem}.png`}*/}
                    {/*    alt={'icon'}*/}
                    {/*    width={22}*/}
                    {/*    height={22}*/}
                    {/*  />*/}
                    {/*))}*/}
                  </PostTags>
                </FoundPostWrapper>
              </BlogIntroWrapper>
            ))
          ) : ((foundPosts.length === 0 && searchString.length > 0) ? (
            <BlogPostsTitle>
              {t('common:postsNotFound')}
            </BlogPostsTitle>
          ) : (
            <TestimonialGrid>
              {/*{allPosts.map((post, key) => (*/}
              {/*  post.show && (*/}
              {/*    <TestimonialArticle key={key} onClick={() => handleRedirect(post.link)}>*/}
              {/*      <PostTitle>{post.title}</PostTitle>*/}
              {/*      <PostTimestamp>{post.timestamp}</PostTimestamp>*/}
              {/*      <PostDescription>{post.description}</PostDescription>*/}
              {/*      <PostTags>*/}
              {/*        {post.searchTags.map((item, index) => (*/}
              {/*          <PostTag key={index}>{item}</PostTag>*/}
              {/*        ))}*/}
              {/*        {post.postType.map((typeItem, index) => (*/}
              {/*          <Image*/}
              {/*            key={index}*/}
              {/*            className={'icon'}*/}
              {/*            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/${typeItem}.png`}*/}
              {/*            alt={'icon'}*/}
              {/*            width={22}*/}
              {/*            height={22}*/}
              {/*          />*/}
              {/*        ))}*/}
              {/*      </PostTags>*/}
              {/*    </TestimonialArticle>*/}
              {/*  )*/}
              {/*))}*/}
            </TestimonialGrid>

          ))}
        </AllPostsWrapper>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default Blog;
