import React from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

import BasicButton from '@components/BasicButton/BasicButton.component';
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
  const [postTypes, setPostTypes] = React.useState<Array<string>>([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [order, setOrder] = React.useState('Created At');
  const [orderBy, setOrderBy] = React.useState('ASC');

  const [foundPosts, setFoundPosts] = React.useState<IPost[]>([]);
  const [allPosts, setAllPosts] = React.useState<IPost[]>([]);

  const { loading, getPosts } = useGetPostsService();

  React.useEffect(() => {
    const orderOption = order === 'Created At' ? 'created_at' : 'title';
    fetchPosts({
      page, pageSize, order: orderOption, orderBy, locale
    }).then(({ rows, count }) => {
      setAllPosts(rows);
    });
  }, []);

  React.useEffect(() => {
    const orderOption = order === 'Created At' ? 'created_at' : 'title';
    fetchPosts({
      page, pageSize, order: orderOption, orderBy, locale, searchQuery, postTypes
    }).then(({ rows, count }) => {
      setFoundPosts(rows);
    });
  }, [searchQuery]);

  React.useEffect(() => {
    const orderOption = order === 'Created At' ? 'created_at' : 'title';
    fetchPosts({
      page, pageSize, order: orderOption, orderBy, locale, searchQuery, postTypes
    }).then(({ rows, count }) => {
      setAllPosts(rows);
    });
  }, [order, orderBy]);

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  const fetchPosts = async ({
    page, pageSize, order, locale, orderBy, searchQuery, postTypes
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
      page, pageSize, order, locale, orderBy, searchQuery, postTypes: postTypes?.join()
    });
  };

  const sortByType = (sortType: string) => {
    const t = [...postTypes];

    if (t.includes(sortType)) t.splice(t.indexOf(sortType), 1);
    else t.push(sortType);

    setPostTypes(t);

    fetchPosts({
      page, pageSize, order, locale, orderBy, searchQuery, postTypes: t
    }).then(({ rows, count }) => {
      setAllPosts(rows);
    });
  };

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
                <BasicButton
                  text={orderBy}
                  onClick={() => setOrderBy(orderBy === 'ASC' ? 'DESC' : 'ASC')}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={order}
                  onClick={() => setOrder(order === 'Created At' ? 'Title' : 'Created At')}
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
                  active={postTypes.includes('practice')}
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
                  active={postTypes.includes('theory')}
                  onClick={() => sortByType('theory')}
                />
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
                  <PostTimestamp>{dayjs(post.createdAt).format('YYYY-MM-DD')}</PostTimestamp>
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
                  <PostTimestamp>{dayjs(post.createdAt).format('YYYY-MM-DD')}</PostTimestamp>
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
