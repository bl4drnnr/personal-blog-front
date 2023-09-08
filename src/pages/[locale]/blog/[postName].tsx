import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Typewriter from 'typewriter-effect';

import CodeHighlighter from '@components/CodeHighlighter/CodeHighlighter.component';
import PostFooter from '@components/PostFooter/PostFooter.component';
import { IPost } from '@interfaces/post.interface';
import DefaultLayout from '@layouts/Default.layout';
import {
  getImageLink,
  isItemCode,
  isItemList,
  isItemParagraph,
  isItemPicture,
  isItemTitle
} from '@lib/checkType';
import {
  ArticleBodyWrapper,
  ArticleTitle,
  ImageContainer,
  PostParagraph,
  TableOfContentsContainer,
  TableOfContentsTitle
} from '@styles/post.style';
import { generateLists } from '@utils/GenerateList.util';
import { generateTableOfContents } from '@utils/GenerateToC.util';

interface PostProps {
  post: IPost;
  locale: string;
}

const BlogPost = ({ locale, post }: PostProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  return (
    <>
      <Head>
        <title>Mikhail Bahdashych | {post.title}</title>
        <meta name={'keywords'} content={post.tags} />
        <meta name={'description'} content={post.description} />
        <meta charSet={'utf-8'} />
      </Head>
      <DefaultLayout locale={locale} translation={t}>
        <ArticleBodyWrapper className={locale === 'en' ? 'en' : 'non-en'}>
          <ArticleTitle>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(75)
                  .typeString(post.title)
                  .start();
              }}
            />
          </ArticleTitle>

          <ArticleTitle className={'intro'}>
            {post.intro}
          </ArticleTitle>

          <TableOfContentsContainer className={locale === 'en' ? 'en' : 'non-en'}>
            <TableOfContentsTitle>
              {t('common:tocTitle')}
            </TableOfContentsTitle>
            {generateTableOfContents(post.toc)}
          </TableOfContentsContainer>

          {
            post.content
              .map((item, index) => (
                <div key={index}>
                  {isItemParagraph(item) ? (
                    <PostParagraph
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  ) : isItemTitle(item) ? (
                    <PostParagraph className={item.type}>
                      {item.content}
                    </PostParagraph>
                  ) : isItemCode(item) ? (
                    <CodeHighlighter
                      language={item.lang}
                      code={item.content}
                    />
                  ) : isItemList(item) ? (
                    generateLists(item.items, locale, item.type, item.style)
                  ) : isItemPicture(item) ? (
                      <ImageContainer className={item.width}>
                        <Image
                          src={getImageLink(item, post.slug)}
                          alt={item.resource as string}
                          className={'image'}
                          fill
                        />
                      </ImageContainer>
                    ) : null
                  }
                </div>
              ))
          }

          <TableOfContentsContainer
            className={`${locale === 'en' ? 'en' : 'non-en'} contact-and-references`}
          >
            {
              Object.entries(post.references).map(([key, value]) => (
                <ul key={key}>
                  <li className={'table-of-contents-ul'}>
                    <a href={value.link}>{value.name}</a>
                  </li>
                </ul>
              ))
            }
          </TableOfContentsContainer>

          <PostFooter
            timestamp={post.createdAt}
            message={post.footer}
            locale={locale}
          />
        </ArticleBodyWrapper>
      </DefaultLayout>
    </>
  );
};

export async function getStaticPaths() {
  const headers = new Headers();

  headers.set('Authorization', 'Basic ' + Buffer.from(
    process.env.DATA_API_USERNAME + ':' + process.env.DATA_API_PASSWORD
  ).toString('base64'));

  const slugsRes = await fetch(
    `${process.env.LOCAL_DATA_API_URL}/posts/get-all-slugs`,
    { headers }
  );

  const slugs = await slugsRes.json();

  const langRes = await fetch(
    `${process.env.LOCAL_DATA_API_URL}/posts/get-available-languages`,
    { headers }
  );

  const languages = await langRes.json();

  const paths: { params: { postName: string; locale: string; }; }[] = [];

  languages.forEach((lang: string) => {
    slugs.forEach((slug: string) => {
      paths.push({
        params: { postName: slug, locale: lang }
      });
    });
  });

  return { paths, fallback: false };
}


export async function getStaticProps({ params }: { params: { locale: string; postName: string } }) {
  const { locale, postName } = params;
  const ns = ['common', 'components', 'pages', 'projects'];

  const headers = new Headers();

  headers.set('Authorization', 'Basic ' + Buffer.from(
    process.env.DATA_API_USERNAME + ':' + process.env.DATA_API_PASSWORD
  ).toString('base64'));

  const res = await fetch(
    `${process.env.LOCAL_DATA_API_URL}/posts/get-by-slug?language=${locale}&slug=${postName}`,
    { headers }
  );

  const post = await res.json();

  return { props: { post, locale, ...(await serverSideTranslations(locale, ns)) } };
}


export default BlogPost;
