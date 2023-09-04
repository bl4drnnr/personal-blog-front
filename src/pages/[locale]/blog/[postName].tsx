import React, { RefObject } from 'react';

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
  ArticleBodyWrapper,
  ArticleTitle, ImageContainer,
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

  const [listRefs, setListRefs] = React.useState<RefObject<unknown>[]>([]);
  const [refNames, setRefNames] = React.useState<Array<string>>([]);

  const getRefByName = (refName: string | undefined): any => {
    let matchingRef = null;
    refNames.forEach((item, index) => {
      if (item === refName && !refName.includes('.')) {
        matchingRef = listRefs[index];
      } else {
        const splitRefName = refName?.split('.');
        if (splitRefName && splitRefName[splitRefName.length - 1] === item) {
          matchingRef = listRefs[index];
        }
      }
    });
    return matchingRef;
  };

  React.useEffect(() => {
    // @ts-ignore
    const availablePosts = process.env.NEXT_PUBLIC_AVAILABLE_POSTS.split(',');
    if (!availablePosts.includes(post.slug)) handleRedirect('/404').then();

    let quantityOfTitles = 0;
    const allRefs: Array<string> = [];

    post.content.forEach((item) => {
      if (
        typeof item !== 'string' &&
        (item.type === 'title' || item.type === 'subtitle' || item.type === 'subsubtitle')
      ) {
        quantityOfTitles += 1;
        allRefs.push(item.content as string);
      }
    });

    setListRefs(Array(quantityOfTitles).fill(null).map(() => React.createRef()));

    setRefNames(allRefs);
  }, []);

  return (
    <>
      <Head>
        <title> | {post.title}</title>
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
                  {typeof item === 'string' ? (
                    <PostParagraph
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ) : (item.type === 'title' || item.type === 'subtitle' || item.type === 'subsubtitle') ? (
                    <PostParagraph
                      className={item.type}
                      ref={getRefByName(item.content)}
                    >{item.content}</PostParagraph>
                  ) : (('lang' in item && 'content' in item) ? (
                    <CodeHighlighter language={item.lang} code={item.content} />
                  ) : ((item.type === 'list-bullet' || item.type === 'list-numeric') ? (
                    generateLists(item.items, locale, item.type, item.style)
                  ) : (
                    ((item.type === 'picture') ? (
                      <ImageContainer className={`${item.width}`}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${post.slug}/${item.resource}`}
                          alt={item.resource as string}
                          className={'image'}
                          fill
                        />
                      </ImageContainer>
                    ) : (<></>))
                    )
                  ))}
                </div>
              ))
          }

          <TableOfContentsContainer className={`${locale === 'en' ? 'en' : 'non-en'} contact-and-references`}>
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
  // @ts-ignore
  const languages = process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES.split(',');
  // @ts-ignore
  const posts = process.env.NEXT_PUBLIC_AVAILABLE_POSTS.split(',');

  const paths: { params: { postName: string; locale: string; }; }[] = [];
  languages.forEach((lang) => {
    posts.forEach((post) => {
      paths.push({
        params: { postName: post, locale: lang }
      });
    });
  });

  return { paths, fallback: false };
}


export async function getStaticProps({ params }: { params: any }) {
  const { locale, postName } = params;
  const ns = ['common', 'components', 'pages', 'projects'];

  const headers = new Headers();

  headers.set('Authorization', 'Basic ' + Buffer.from(
    process.env.DATA_API_USERNAME + ':' + process.env.DATA_API_PASSWORD
  ).toString('base64'));

  const res = await fetch(
    `${process.env.LOCAL_DATA_API_URL}/posts/${locale}/${postName}`,
    { headers }
  );
  const post = await res.json();

  return { props: { post, locale, ...(await serverSideTranslations(locale, ns)) } };
}


export default BlogPost;
