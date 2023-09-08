import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import BasicButton from '@components/BasicButton/BasicButton.component';
import BasicInput from '@components/BasicInput/BasicInput.component';
import { OrderBy } from '@custom-types/order-by.type';
import { Order } from '@custom-types/order.type';
import { OrderOptions } from '@enums/order-option.enum';
import { IFetchPosts } from '@interfaces/fetch-posts.interface';
import { IInitFetchPosts } from '@interfaces/init-fetch-posts.interface';
import { IPostPreview } from '@interfaces/post-preview.interface';
import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import { useGetPostsService } from '@services/get-posts.service';
import {
  AllPostsWrapper,
  BlogIntroWrapper,
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

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [postTypes, setPostTypes] = React.useState<Array<string>>([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [order, setOrder] = React.useState<Order>('By creation date');
  const [orderBy, setOrderBy] = React.useState<OrderBy>('ASC');

  const [foundPosts, setFoundPosts] = React.useState<IPostPreview[]>([]);
  const [allPosts, setAllPosts] = React.useState<IPostPreview[]>([]);

  const { loading, getPosts } = useGetPostsService();

  React.useEffect(() => {
    initFetchPosts({
      q: searchQuery,
      o: order,
      oBy: orderBy
    }).then();
  }, []);

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  const initFetchPosts = async ({
    q, o, oBy
  }: IInitFetchPosts) => {
    const orderOption = o === 'By creation date'
      ? OrderOptions.CREATED_AT
      : OrderOptions.TITLE;

    setSearchQuery(q);
    setOrderBy(oBy);
    setOrder(o);

    fetchPosts({
      page,
      pageSize,
      locale,
      postTypes,
      orderBy: oBy,
      searchQuery: q,
      order: orderOption
    }).then(({ rows }) => {
      if (q && rows.length) setFoundPosts(rows);
      else setAllPosts(rows);
    });
  };

  const fetchPosts = async ({
    page,
    pageSize,
    order,
    locale,
    orderBy,
    searchQuery,
    postTypes
  }: IFetchPosts) => {
    const joinedPostsTypes = postTypes && postTypes.length > 0 ? postTypes?.join() : '';
    return await getPosts({
      page,
      pageSize,
      order,
      locale,
      orderBy,
      searchQuery,
      postTypes: joinedPostsTypes
    });
  };

  const sortByType = (sortType: string) => {
    const t = [...postTypes];

    const orderOption = order === 'By creation date'
      ? OrderOptions.CREATED_AT
      : OrderOptions.TITLE;

    if (t.includes(sortType)) t.splice(t.indexOf(sortType), 1);
    else t.push(sortType);

    setPostTypes(t);

    fetchPosts({
      page,
      pageSize,
      locale,
      orderBy,
      searchQuery,
      order: orderOption,
      postTypes: t
    }).then(({ rows }) => {
      setAllPosts(rows);
    });
  };

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:blog.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translation={t} loading={loading}>

        <AllPostsWrapper className={locale === 'en' ? 'en' : 'non-en'}>
          <InputWrapper>
            <BasicInput
              locale={locale}
              value={searchQuery}
              placeholder={t('common:searchPosts')}
              onChange={(e) => initFetchPosts({
                q: e.target.value,
                o: order,
                oBy: orderBy
              })}
            />
            <SettingsWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={orderBy}
                  onClick={() => initFetchPosts({
                    q: searchQuery,
                    o: order,
                    oBy: orderBy === 'ASC' ? 'DESC' : 'ASC',
                  })}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={order}
                  onClick={() => initFetchPosts({
                    q: searchQuery,
                    o: order === 'By creation date' ? 'By title' : 'By creation date',
                    oBy: orderBy
                  })}
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

          {foundPosts.length > 0 && searchQuery.length > 0 ? (
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
          ) : foundPosts.length === 0 && searchQuery.length > 0 ? (
            <BlogPostsTitle>
              {t('common:postsNotFound')}
            </BlogPostsTitle>
          ) : (
            <TestimonialGrid>
              {allPosts.map((post, key) => (
                <TestimonialArticle
                  key={key}
                  onClick={() => handleRedirect(`/blog/${post.slug}`)}
                >
                  <PostTitle>{post.title}</PostTitle>
                  <PostTimestamp>
                    {dayjs(post.createdAt).format('YYYY-MM-DD')}
                  </PostTimestamp>
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
          )}
        </AllPostsWrapper>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default Blog;
