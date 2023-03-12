import React from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

import BasicInput from '@components/BasicInput/BasicInput.component';
import { IPost } from '@interfaces/post.interface';
import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import { useGetPostsService } from '@services/get-posts.service';
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

const Blog = ({ locale }: BlogProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState('');
  // const [dateSort, setDateSort] = React.useState('');
  // const [nameSort, setNameSort] = React.useState('');
  const [postTypes, setPostTypes] = React.useState<Array<string>>([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [order, setOrder] = React.useState('created_at');
  const [orderBy, setOrderBy] = React.useState('ASC');

  const [foundPosts, setFoundPosts] = React.useState<IPost[]>([]);
  const [allPosts, setAllPosts] = React.useState<IPost[]>([]);

  const { loading, getPosts } = useGetPostsService();

  React.useEffect(() => {
    fetchPosts({
      page,
      pageSize,
      order,
      orderBy,
      locale
    }).then(({ rows, count }) => {
      setAllPosts(rows);
    });
  }, []);

  React.useEffect(() => {
    fetchPosts({
      page,
      pageSize,
      order,
      orderBy,
      locale,
      searchQuery
    }).then(({ rows, count }) => {
      setFoundPosts(rows);
    });
  }, [searchQuery]);

  React.useEffect(() => {
    fetchPosts({
      page,
      pageSize,
      order,
      orderBy,
      locale,
      searchQuery,
      postTypes
    }).then(({ rows, count }) => {
      setAllPosts(rows);
    });
  }, [postTypes]);

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  const fetchPosts = async ({
    page,
    pageSize,
    order,
    locale,
    orderBy,
    searchQuery
  }: {
    page: number;
    pageSize: number;
    order: string;
    locale: string;
    orderBy: string;
    searchQuery?: string
    postTypes?: Array<string>
  }) => {
    return await getPosts({
      page, pageSize, order, locale, orderBy, searchQuery, postTypes: postTypes.join()
    });
  };

  // const sortByDate = (date: string) => {
  //   const currentPosts = allPosts;
  //
  //   if (date !== '' && date === 'ASC') {
  //     setDateSort('DESC');
  //     currentPosts.sort((a, b) => dayjs(b.timestamp).diff(a.timestamp));
  //   }
  //   else {
  //     setDateSort('ASC');
  //     currentPosts.sort((a, b) => dayjs(a.timestamp).diff(b.timestamp));
  //   }
  //
  //   setAllPosts(currentPosts);
  // };

  // const sortByName = (sortType: string) => {
  //   const currentPosts = allPosts;
  //
  //   if (sortType !== '' && sortType === 'A -> Z') {
  //     setNameSort('Z -> A');
  //     currentPosts.sort((a, b) => b.title.localeCompare(a.title));
  //   } else {
  //     setNameSort('A -> Z');
  //     currentPosts.sort((a, b) => a.title.localeCompare(b.title));
  //   }
  //
  //   setAllPosts(currentPosts);
  // };

  // const sortByType = (sortType: string) => {
  //   const t = [...postTypeSort];
  //
  //   if (t.includes(sortType)) t.splice(t.indexOf(sortType), 1);
  //   else t.push(sortType);
  //
  //   setPostTypeSort(t);
  //
  //   const localTheory = t.includes('theory');
  //   const localPractice = t.includes('practice');
  //
  //   const sortedPosts: PostProps[] = allPosts.map((post) => {
  //     const hasPractice = post.postType.includes('practice');
  //     const hasTheory = post.postType.includes('theory');
  //     const showPost = (localPractice && hasPractice) || (localTheory && hasTheory);
  //
  //     if (t.length === 0) {
  //       return { ...post, show: true };
  //     } else {
  //       if (localTheory && localPractice) return { ...post, show: hasPractice && hasTheory };
  //       else if (showPost) return { ...post, show: true };
  //       else return { ...post, show: false };
  //     }
  //   });
  //
  //   setAllPosts(sortedPosts);
  // };

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:blog.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translation={t} loading={loading}>

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
              value={searchQuery}
              placeholder={t('common:searchPosts')}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SettingsWrapper>
              <ButtonWrapper>
                {/*<BasicButton*/}
                {/*  text={dateSort !== '' ? dateSort : 'ASC/DESC'}*/}
                {/*  onClick={() => sortByDate(dateSort)}*/}
                {/*/>*/}
              </ButtonWrapper>
              <ButtonWrapper>
                {/*<BasicButton*/}
                {/*  text={nameSort !== '' ? nameSort : 'A-Z'}*/}
                {/*  onClick={() => sortByName(nameSort)}*/}
                {/*/>*/}
              </ButtonWrapper>
              <ButtonWrapper>
                {/*<BasicButton*/}
                {/*  text={*/}
                {/*    <Image*/}
                {/*      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/practice.png`}*/}
                {/*      alt={'icon'}*/}
                {/*      width={22}*/}
                {/*      height={22}*/}
                {/*    />*/}
                {/*  }*/}
                {/*  active={postTypeSort.includes('practice')}*/}
                {/*  onClick={() => sortByType('practice')}*/}
                {/*/>*/}
              </ButtonWrapper>
              <ButtonWrapper>
                {/*<BasicButton*/}
                {/*  text={*/}
                {/*    <Image*/}
                {/*      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/theory.png`}*/}
                {/*      alt={'icon'}*/}
                {/*      width={22}*/}
                {/*      height={22}*/}
                {/*    />*/}
                {/*  }*/}
                {/*  active={postTypeSort.includes('theory')}*/}
                {/*  onClick={() => sortByType('theory')}*/}
                {/*/>*/}
              </ButtonWrapper>
            </SettingsWrapper>
          </InputWrapper>

          {(foundPosts.length > 0 && searchQuery.length > 0) ? (
            foundPosts.map((post, key) => (
              <BlogIntroWrapper
                key={key}
                className={'found-posts'}
                onClick={() => handleRedirect(`/blog/${post.slug}`)}
              >
                <FoundPostWrapper>
                  <PostTitle>{post.title}</PostTitle>
                  <PostTimestamp>{post.timestamp}</PostTimestamp>
                  <PostDescription>{post.description}</PostDescription>
                  <PostTags>
                    {post.searchTags.map((item, index) => (
                      <PostTag key={index}>{item}</PostTag>
                    ))}
                    {post.type.map((typeItem, index) => (
                      <Image
                        key={index}
                        className={'icon'}
                        src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/${typeItem}.png`}
                        alt={'icon'}
                        width={22}
                        height={22}
                      />
                    ))}
                  </PostTags>
                </FoundPostWrapper>
              </BlogIntroWrapper>
            ))
          ) : ((foundPosts.length === 0 && searchQuery.length > 0) ? (
            <BlogPostsTitle>
              {t('common:postsNotFound')}
            </BlogPostsTitle>
          ) : (
            <TestimonialGrid>
              {allPosts.map((post, key) => (
                <TestimonialArticle key={key} onClick={() => handleRedirect(`/blog/${post.slug}`)}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostTimestamp>{post.timestamp}</PostTimestamp>
                  <PostDescription>{post.description}</PostDescription>
                  <PostTags>
                    {post.searchTags.map((item, index) => (
                      <PostTag key={index}>{item}</PostTag>
                    ))}
                    {post.type.map((typeItem, index) => (
                      <Image
                        key={index}
                        className={'icon'}
                        src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/${typeItem}.png`}
                        alt={'icon'}
                        width={22}
                        height={22}
                      />
                    ))}
                  </PostTags>
                </TestimonialArticle>
              ))}
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
